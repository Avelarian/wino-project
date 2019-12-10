import { ResolverMap } from "./types/graphql-utils";
import { Sale } from "./entity/Sale";
import { GetSalesTotal } from "./entity/getSalesTotal";

import * as fs from 'fs';

export const resolvers: ResolverMap = {
    Query: {
        hello: (_: any, { name }: any) => `hello ${name || "World"}`,
        sale: (_, { id }) => Sale.findOne(id),
        sales: () => Sale.find(),
        getSalesTotal: async () => {
            const sales = await Sale.find();
            let amount: number = 0;
            let count: number = 0;
            sales.forEach(sale => {
                amount += sale.amount;
                count++;
            });
            return GetSalesTotal.create({
                amount,
                count
            });
        },
      },
    Mutation: {
        createSale: (_, args) => Sale.create(args).save(),
        updateSale: async (_, { id, ...args }) => {
            try {
                await Sale.update(id, args);
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        deleteSale: async (_, { id }) => {
            try {
                await Sale.remove(id);
            } catch (err) {
                console.log(err);
                return false;
            }

            return true;
        },
        exportSales: async () => {
            let items: any = [];
            await Sale.find().then(results => {
                items = results;
            })
            if (!items || !items.length) {
                return false;
            }
            const separator = ',';
            const keys = Object.keys(items[0]);
            let csvContent =
              keys.join(separator) +
              '\n' +
              items.map((item: any) => {
                return keys.map(k => {
                  let cell = item[k] === null || item[k] === undefined ? '' : item[k];
                  cell = cell instanceof Date
                    ? cell.toLocaleString()
                    : cell.toString().replace(/"/g, '""');
                  if (cell.search(/("|,|\n)/g) >= 0) {
                    cell = `"${cell}"`;
                  }
                  return cell;
                }).join(separator);
              }).join('\n');

            csvContent += '\n' + ',Total,=SUM(C2+C3)';
            
            const filePath = __dirname + '/xlsx_files/table-' + new Date() + '.xlsx'
            await fs.writeFile(filePath, csvContent, (err) => {
                if (err) throw err;
            
                console.log("The file was succesfully saved!");
            });

            return { filePath };
        }
    },
};