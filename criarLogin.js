const axios = require('axios');

async function createLogin() {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      user: 'teste123', //Quem for usar, só alterar o usuário e a senha que dá bom
      password: '123456789'
    });

    console.log('Login criado com sucesso:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Erro na resposta:', error.response.data);
    } else {
      console.error('Erro ao criar login:', error.message);
    }
  }
}

createLogin();
