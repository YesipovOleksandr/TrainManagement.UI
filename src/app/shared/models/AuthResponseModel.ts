export class AuthResponseModel {
    public token: string;
    public refresh_token: string;
    public refresh_token_expiry_time: string;
    public updateData(model: AuthResponseModel) {
      this.token = model.token || this.token;
      this.refresh_token = model.refresh_token || this.refresh_token;
      this.refresh_token_expiry_time = model.refresh_token_expiry_time || this.refresh_token_expiry_time;
    }
  }
  