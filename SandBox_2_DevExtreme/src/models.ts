export interface Project{
    id: string;
    businessesIds:string[];
    status:number;
};

export interface CrawledURLs{
    url: string;
    //Stringa con il seguente formato: 300, 400, 500...
    statusCode:string;
    //Da definire
    isInternal:boolean;
    //Con due elementi: il primo è relativo all'attributo content del tag meta, il secondo è relativo al charset del tag meta
    content:string[];
    indexable:boolean;
    depth:number;
    inLinks:number;
    outLinks:number;
    //Stringa con il seguente formato: aaaa,bbbb
    metaRobots1:string;
}