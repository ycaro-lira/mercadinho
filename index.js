let total = 0;
    const listaProdutos = document.getElementById("listaProdutos");
    const totalSpan = document.getElementById("total");
    const cupomFinalDiv = document.getElementById("cupomFinal");
    const cupomResultado = document.getElementById("cupomResultado");
    const trocoInfo = document.getElementById("trocoInfo");

    function adicionarProduto() {
      const nomeProdutoInput = document.getElementById("nomeProduto");
      const valorProdutoInput = document.getElementById("valorProduto");
      const quantidadeInput = document.getElementById("quantidade");

      const nomeProduto = nomeProdutoInput.value;
      const valorProduto = parseFloat(valorProdutoInput.value);
      const quantidade = parseInt(quantidadeInput.value);

      if (!nomeProduto || isNaN(valorProduto) || isNaN(quantidade)) {
        alert("Por favor, preencha todos os campos do produto.");
        return;
      }

      const subtotal = valorProduto * quantidade;
      total += subtotal;

      const produtoItem = document.createElement("li");
      produtoItem.textContent = `${nomeProduto} - R$ ${valorProduto.toFixed(2)} x ${quantidade} = R$ ${subtotal.toFixed(2)}`;
      listaProdutos.appendChild(produtoItem);

      totalSpan.textContent = total.toFixed(2);

      nomeProdutoInput.value = "";
      valorProdutoInput.value = "";
      quantidadeInput.value = "";
    }

    function calcularTroco() {
      if (total === 0) {
        alert("Você não adicionou nenhum produto no carrinho.");
        return;
      }

      const valorPagamentoInput = document.getElementById("valorPagamento");
      const valorPagamento = parseFloat(valorPagamentoInput.value);

      const troco = valorPagamento - total;

      if (troco >= 0) {
        trocoInfo.textContent = `Troco do cliente: R$ ${troco.toFixed(2)}`;
      } else {
        const falta = Math.abs(troco);
        trocoInfo.textContent = `Falta pagar: R$ ${falta.toFixed(2)}`;
      }

      const cupom = `
        -- CUPOM DO CLIENTE --
        ${getListaProdutos()}
        Total da compra: R$ ${total.toFixed(2)}
        Total pago: R$ ${valorPagamento.toFixed(2)}
      `;

      cupomResultado.textContent = cupom;
      cupomFinalDiv.style.display = "block";
    }

    function getListaProdutos() {
      const produtos = [];
      const items = listaProdutos.querySelectorAll("li");
      items.forEach(item => produtos.push(item.textContent));
      return produtos.join("\n");
    }