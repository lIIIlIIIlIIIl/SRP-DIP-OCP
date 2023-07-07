/*
AuthServiceInterface
signin(): Promise<undefined>
signup(): Promise<undefined>
signout(): Promise<undefined>
*/

export class AuthService {
  constructor(httpClient, tokenRepository) {
    this.httpClient = httpClient;
    this.tokenRepository = tokenRepository;
  }

  async signin(email, password) {
    const response = await this.httpClient.fetch("auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const { access_token } = await response.json();
    this.tokenRepository.save(access_token);
  }

  async signup(email, password) {
    const response = await this.httpClient.fetch("auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw response;
    }
  }

  logout() {
    this.tokenRepository.remove();
  }
}
