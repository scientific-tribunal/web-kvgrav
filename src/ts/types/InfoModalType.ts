type InfoModalType = {
  title: string | null;
  body: string | null;
  html: string | null;
  ok: ((status: boolean) => void) | null;
  confirm: ((status: boolean) => void) | null;
  close: boolean;
};

export default InfoModalType;
