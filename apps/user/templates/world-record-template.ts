import { Attribute } from '../interfaces/user.interface';

export class WorldRecordTemplate {
  findAttributeByName(attributes: Attribute[], name: string): Attribute {
    return attributes.find((attr) => name in attr);
  }

  async getWorldRecordTemplate(attributes: Attribute[]): Promise<string> {
    try {
      const [name, discipline, issuedBy] = await Promise.all(attributes).then((attributes) => {
        const name = this.findAttributeByName(attributes, 'full_name')?.full_name ?? '';
        const discipline = this.findAttributeByName(attributes, 'discipline')?.discipline ?? '';
        const issuedBy = this.findAttributeByName(attributes, 'issued_by')?.issued_by ?? '';
        return [name, discipline, issuedBy];
      });
      return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap" rel="stylesheet">
      
        <style>
          body {
            margin: 0;
            background-color: #f0f0f0; 
          }
      
          #container {
            padding: 0 20px; 
          }
      
          #backgroundImage {
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
          }
      
          #textOverlay {
              position: absolute;
          top: 280px;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          color: #2B2B2A;
          font-size: 24px; 
            
          }
        </style>
      </head>
      <body>
      
      <div id="container" style="">
      <img id="backgroundImage" src="https://credebl-dev-user-certificate.s3.ap-south-1.amazonaws.com/certificates/background_image.svg" alt="background" 
        style="height: 1000px; width: 770px;"
        />
        <div id="textOverlay" style="width: 640px; height: 690px;">
          <div>
              <p style="font-size: 50px; font-family: Inter; margin: 0;">CERTIFICATE</p>
              <p style="font-size: 22px; font-family: Inter; margin: 0;"> OF WORLD RECORD</p>
          </div>
          
          <p style="font-size: 15px; font-family: Inter;margin: 15; margin-top: 15px;">IS PROUDLY PRESENTED TO</p>
          <p style="font-size: 45px; font-family: 'Dancing Script', cursive;
          background: linear-gradient(90deg, #B9752B 2.4%, #F8D675 29.13%, #CD953F 52.41%, #F6D373 75.07%, #BF7E32 105.84%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 15px;">${name}</p>
          
          <span style="font-size: 16px;">for successfully creating the world record in the 
             ${discipline}
              <p style="font-size: 16px; " >discipline during the
              <span style="font-size: 16px; font-weight: bold;">${issuedBy} World Memory Championship 2023.</span>
              </p>
          </p>
          <p>
              <p style="font-size: 14px; margin: 0;">We acknowledge your dedication, hard work, and</p>
              <p style="font-size: 14px; margin: 0;">exceptional memory skills demonstrated during the competition.</p>
          </p>
          <div style="font-family: Inter; font-weight: bold; font-size: 12px;">Date: 24, 25, 26 November 2023 | Place: Cidco Exhibition Centre, Navi Mumbai, India</div>
          <div style="font-family: Inter;font-weight: bold;font-size: 12px;position: absolute;bottom: 6px;left: 50%;transform: translateX(-50%);width: 100%;">Blockchain-based certificate issued using credebl.id, by Blockster Labs Pvt. Ltd.</div>
        </div>
      </div>
      
      </body>
      </html>`;
    } catch {}
  }
}
