const User = require('../models/User');

// index = Cria um método que retorna uma listagem de seções
// show = Cria um método que retorna uma Única Seção
// store = Cria uma Seção
// update = altera uma seção
// destroy = Deleta uma seção

module.exports = {
async store(req, res) {
     const { email } = req.body;
     let user = await User.findOne({ email });

     if (!user) {
         user = await User.create({ email });
         
     }


    return res.json(user);
    
}
};