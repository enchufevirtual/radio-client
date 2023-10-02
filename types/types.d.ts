export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export interface ErrorRequest {
  message: string;
}

export interface Data {
  password: string,
  new_password: string
}

export interface MenuProfileProps {
  imgRef: React.RefObject<HTMLImageElement>;
}

export interface CardTypes {
  title: string,
  createAt: string,
  postContent: string,
  user: {
    name: string,
    image: string
  }
}
