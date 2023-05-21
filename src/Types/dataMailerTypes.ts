interface IDataMailer {
    [key: string]: {
      subject: string;
      html: string;
      // text: string;
    };
  }