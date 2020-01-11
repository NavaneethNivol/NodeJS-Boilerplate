var db = require("../models/db");

async function main(){
    
    db.public.sequelize.sync({
        force: true
    })
    .then(() => {
        return 0;
    })   
}

if(require.main == module){
    main();
}
