import React, { Component } from "react";
import TecToken from "../TecToken";
import styles from "../Wallet.module.css";
import web3 from "../Web3";

class Token extends Component {
  state = {
    name: "",
    symbol: "",
    totalSupply: "",
    message: "",
    connectWalletText: "Cüzdana Bağlan",
    address: "",
    addressBalance: "",
    senderAddress: "",
    mount: 0,
  };
  async componentDidMount() {
    const name = await TecToken.methods.name().call();
    const symbol = await TecToken.methods.symbol().call();
    const totalSupply2 = await TecToken.methods.totalSupply().call();
    let totalSupply3 = Number(totalSupply2);
    let totalSupply = totalSupply3.toLocaleString();
    this.setState({ name, symbol, totalSupply });
  }

  connectWallet = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ connectWalletText: "Bağlanıyor..." });
    this.setState({ address: accounts[0] });
    const balance1 = await TecToken.methods.balanceOf(accounts[0]).call();
    let balance2 = Number(balance1);
    let balance = balance2.toLocaleString();
    console.log(typeof balance);
    this.setState({ connectWalletText: "Cüzdana Bağlan" });
    this.setState({ addressBalance: balance });
  };
  transferToken = async () => {
    this.setState({ message: "Transferin başarılı olması bekleniyor..." });
    await TecToken.methods
      .transfer("0x21E0193ACf3a957d4655a1C67ad10376fc0EbFe9", this.state.mount)
      .send({
        from: this.state.senderAddress,
        gasLimit: "3000000",
      });
    this.setState({
      message: "Transfer başarılı, bağışınız için çok teşekkürler!",
    });
  };

  render() {
    return (
      <div>
        <h2 className={styles.tokenName}>Tec Token Bağış Ekranı</h2>
        <div className={styles.walletCard}>
          <h3>Token Adı: {this.state.name}</h3>
          <h3>Token Sembolü: {this.state.symbol}</h3>
          <h3>Bağış Adresimiz: 0x21E0193ACf3a957d4655a1C67ad10376fc0EbFe9</h3>
        </div>

        <div className={styles.btnWrapper}>
          <button className={styles.button6} onClick={this.connectWallet}>
            {this.state.connectWalletText}
          </button>
        </div>

        <div className="p">
          <div className={styles.addressWrapper}>
            <h3>Adres: {this.state.address}</h3>
            <h3>Miktar: {this.state.addressBalance}</h3>
          </div>
        </div>

        <div className={styles.interactionsCard}>
          <div>
            <h2 className={styles.header}>TEC TOKEN TRANSFERİ</h2>
            <input
              type="text"
              value={this.senderAddress}
              className={styles.addressInput}
              onChange={(event) =>
                this.setState({ senderAddress: event.target.value })
              }
              placeholder="Adresinizi giriniz"
            />{" "}
            <br></br>
            <input
              type="text"
              value={this.mount}
              className={styles.addressInput}
              onChange={(event) => this.setState({ mount: event.target.value })}
              placeholder="Göndermek istediğiniz TEC miktarını giriniz"
            />
          </div>
          <div className={styles.btnWrapper}>
            <button className={styles.button6} onClick={this.transferToken}>
              Bağış Token'ını Gönder
            </button>
          </div>
        </div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default Token;
