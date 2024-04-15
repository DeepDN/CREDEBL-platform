import { Attribute } from '../interfaces/user.interface';

export class EventCertificate {
  findAttributeByName(attributes: Attribute[], name: string): Attribute {
    return attributes.find((attr) => name in attr);
  }

  async getCertificateWinner(attributes: Attribute[], QRDetails): Promise<string> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [name, description, category] = await Promise.all(attributes).then((attributes) => {
        const name = this.findAttributeByName(attributes, 'name').name ?? '';
        const description = this.findAttributeByName(attributes, 'description').description ?? '';
        const category = this.findAttributeByName(attributes, 'category').category ?? '';
        return [name, description, category];
      });
      return `<!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Federo&family=Gentium+Book+Plus:ital,wght@0,400;0,700;1,400;1,700&family=MonteCarlo&display=swap" rel="stylesheet">
              <title>Document</title>
              <style>
                  p, h1, h2, h3 {
                      margin: 0;
                  }
              </style>
          </head>
          <body style="font-family: 'Gentium Book Plus', serif; font-weight: 400; font-style: normal;">
              <div style="position: relative; margin: auto; width: fit-content;">
                  <div style="width: 1591px;min-width: 1591px;">
                      <img style="width: 1591px;min-width: 1591px;" src="https://credebl-dev-user-certificate.s3.ap-south-1.amazonaws.com/certificates/cert-background.png" />
                  </div>
                  <div style="box-shadow: 0px 0px 25px -10px black;padding: 2rem 6rem;position: absolute;width: 1372px;min-width: 1398px;height: calc(100% - 4.45rem + 1.5px);top: 0px;">
                      <div style="position: absolute; right: 4rem; top: 3rem">
                          <img style="height: 65px;" src="https://credebl-dev-user-certificate.s3.ap-south-1.amazonaws.com/certificates/anniversary.svg" />
                      </div>
                      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; margin: 0 auto;">
                          <div>
                              <img style="height: 68px;" src="https://credebl-dev-user-certificate.s3.ap-south-1.amazonaws.com/certificates/ayanworks-logo.svg" />
                          </div>
                          <h2 style="color: #10005F; font-size: 60px; font-weight: 400;">Certificate of Appreciation</h2>
                          <h1 style="color: #10005F; font-size: 86px; font-family: 'Federo', sans-serif; font-weight: 600;">- ${category} -</h1>
                          <div style="font-size: 32px; text-align: center; max-width: 1082px;">
                              <p style="color: #342094;">this certificate is proudly presented to</p>
                              <h1 style="color: #02205F; font-size: 120px; font-family: 'MonteCarlo', cursive; font-weight: 400;">${name}</h1>
                              <p style="color: #342094;">${description}</p>
                              <p style="font-weight: bolder; color: #342094;">~  23rd March 2024  ~</p>
                          </div>
                          <div style="position: absolute;
                          left: 9.5rem;
                          bottom: 2.5rem;">
                          <img src="${QRDetails}" style="width: 220px; height: 220px;" alt="QR Code" flex; margin-right: 10px;/>
                          </div>
                          <div style="display: flex; justify-content: center; gap: 3rem; font-size: 32px; text-align: center; margin-top: 1rem; position: absolute; bottom: 3rem; color: #342094;">
                              <div style="display: flex; flex-direction: column; align-items: center;">
                                  <img style="height: 99px" src="https://credebl-dev-user-certificate.s3.ap-south-1.amazonaws.com/certificates/kk-sign.svg" />
                                  <div style="border-top: 1px solid #000000; margin-top: -1rem; padding: 1rem 2rem 0 2rem;">
                                      <p>Kirankalyan Kulkarni</p>
                                      <p>CEO & Co-Founder</p>
                                  </div>
                              </div>
                              <div style="display: flex; flex-direction: column; align-items: center;">
                                  <img style="height: 99px" src="https://credebl-dev-user-certificate.s3.ap-south-1.amazonaws.com/certificates/ak-sign.svg" />
                                  <div style="border-top: 1px solid #000000; margin-top: -1rem; padding: 1rem 2rem 0 2rem;">
                                      <p>Ajay Jadhav</p>
                                      <p>CTO & Co-Founder</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </body>
      </html>
      `;
    } catch { }
  }
}