import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  // GET /filteredimage?image_url={{URL}}
  // endpoint filters an image from a public url.
  // QUERY PARAMETERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file 

  /**************************************************************************** */

  app.get("/filteredImage", async (req: Request, res: Response) => {
      const image_url = req.query.image_url;
      if(!image_url){
        return res.status(400).send("image_url query param required")
      }
      else{
        const filteredImage = await filterImageFromURL(image_url);
        res.sendFile(filteredImage, () => deleteLocalFiles([filteredImage]));
         
        return;
      }
  })


  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req: Request, res: Response ) => {
    
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
