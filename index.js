require( 'dotenv' ).config();
const express = require( 'express' );
const serveIndex = require( 'serve-index' );

const port = process.env.PORT || 3000;
const app = express();

app.use( '/public', express.static( 'public' ) );
app.use( '/public', serveIndex( 'public' ) );

app.get( '/', ( _, res ) => {
  res.send( "Hi, you are in my server! What you need?" );
} );

app.listen( port, () => console.log( `Server listening in port ${ port }` ) );
