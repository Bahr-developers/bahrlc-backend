export declare interface UpdateProjectRequest {
    id: string;
    name?: string;
    url?:string
    images?:any
    type?: 'website' | 'crm' | 'erp' | 'mobile';
  }
  