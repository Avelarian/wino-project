// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
hello: string;
sale: ISale;
sales: Array<ISale>;
getSalesTotal: IGetSalesTotal;
}

interface IHelloOnQueryArguments {
name?: string | null;
}

interface ISaleOnQueryArguments {
id: number;
}

interface ISale {
__typename: "Sale";
id: number;
name: string;
amount: number;
}

interface IGetSalesTotal {
__typename: "GetSalesTotal";
id: number;
amount: number;
count: number;
}

interface IMutation {
__typename: "Mutation";
createSale: ISale;
updateSale: boolean | null;
deleteSale: boolean | null;
exportSales: IExportSales;
}

interface ICreateSaleOnMutationArguments {
name: string;
amount: number;
}

interface IUpdateSaleOnMutationArguments {
id: number;
name?: string | null;
amount?: number | null;
}

interface IDeleteSaleOnMutationArguments {
id: number;
}

interface IExportSales {
__typename: "exportSales";
filePath: string;
}
}

// tslint:enable
