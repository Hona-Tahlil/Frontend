export type ChangePetSitterStatusPayload = {
    petSitterUserID: number;
    status: number; // 1 pending, 2 accepted, 3 rejected
  };
  
  export type ChangePetSitterStatusResponse = {
    statusCode: number;
    message: string;
  };
  