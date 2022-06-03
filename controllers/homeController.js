module.exports.home = (req,res)=>{
    try{
        return res.render('home',{
            title:'Home'
        });
    }
    catch(err){
        console.log('err',err);
        return res.send('Error');
    }
}