module.exports = mongoose => {
  const Livro = mongoose.model(
    "livro",
    mongoose.Schema(
      {
        isbnLivro:String,
        autorLivro:String,
        tituloLivro:String,
        qtdExemplares:Number,
      },
      { timestamps: true }
    )
  );
  return Livro;
};