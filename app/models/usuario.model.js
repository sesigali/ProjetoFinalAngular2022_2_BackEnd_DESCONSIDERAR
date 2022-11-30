module.exports = mongoose => {
  const Usuario = mongoose.model(
    "usuario",
    mongoose.Schema(
      {
        cpf:String,
        nome:String,
        email:String,
        telefone:String,
        qtdLivrosEmprestados:Number,
      },
      { timestamps: true }
    )
  );
  return Usuario;
};