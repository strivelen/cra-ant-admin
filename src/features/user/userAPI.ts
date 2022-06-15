// A mock function to mimic making an async request for data

interface UserInfo {
  data: {
    name: string;
    token: string;
  };
}

export interface FetchLoginParams {
  username: string;
  password: string;
}

export function fetchLogin({ username, password }: FetchLoginParams) {
  return new Promise<UserInfo>((resolve) =>
    setTimeout(
      () => resolve({ data: { name: username, token: username + password } }),
      500
    )
  );
}
