export abstract class Config {
    
    public static get pageSize() : number {
        var ps = process.env.REACT_APP_PAGE_SIZE as unknown  as number
        return ps;
    }
    

}