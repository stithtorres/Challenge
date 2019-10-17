import app from './app';
import '@babel/polyfill';

async function main(){
    const port = 9000;
    await app.listen(port,()=>{console.log(`listening on port ${port}`)});
};

main();