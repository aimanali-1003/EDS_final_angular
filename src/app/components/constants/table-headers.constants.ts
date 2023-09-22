export const CATEGORY = [
    'ID', 'Name', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const CLIENT = [
    'Client ID', 'Client Name', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const DATARECIPIENT = [
    'DataRecipient ID', 'DataRecipient Info', 'Client ID', 'Lookup ID', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const NOTIFICATIONRECIPIENT = [
    'NotificationRecipient ID', 'NotificationRecipient Info', 'Client ID', 'Lookup ID', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const Orgs = [
    'OrgID', 'OrgName', 'OrgCode', 'Client ID', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const criteria = [
    'Criteria ID', 'StartDate', 'EndDate', 'FilterColumnValue', 'CriteriaTypeLookupID', 'FilterTemplateColumnID', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const frequency = [
   'FrequencyID', 'Type', 'DayOfWeek', 'DateOfMonth', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const JOB = [
    'Job ID', 'Frequency ID','Send Notification','Delivery Method', 'MinRecordCountAlarm', 'MaxRecordCountAlarm', 'MinRunDurationAlarm', 'MaxRunDurationAlarm', 'Active',
  ];
  
  export const JOBLOG = [
    'JobLogID', 'JobRunDateTime', 'JobRunDuration', 'ExtractSuccess', 'NotificationRecipientSuccess', 'ExtractedRecordCount', 'JobID', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const LOOKUP = [
   'id', 'type', 'lookup_visible_value', 'lookup_hidden_value', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const COLUMNS = [
    'ColID', 'ColName', 'ColNameExternalDB', 'Category ID', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ]
  
  export const TEMPLATE = [
    'TemplateID', 'TemplateName', 'CategoryID', 'Created At', 'Created By', 'Updated At', 'Updated By', 'Active',
  ];
  
  export const TEMPLATECOLUMNS = [
    'TemplateColumnID', 'TemplateID', 'ColID',
  ];