export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

export interface Data {
  password: string,
  new_password: string
}

export interface MenuProfileProps {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  imgRef: React.RefObject<HTMLImageElement>;
}
