<template>
  <div>
    <Modal />
    <h2><strong> Now it's easy to top up balance! </strong></h2>
    <div class="ui container">
        <div class="form">
          <div class="ui input flexbox">
            <input type="text" name="name" placeholder="Ali" />
            <input type="text" name="surname" placeholder="Candan" />
          </div>
          <div class="ui input labeled">
            <div class="ui label">+90</div>
            <input type="text" name="phoneNumber" placeholder="5xxx xxx xx xx" />
          </div>
          <div class="ui input ">
            <input type="text" name="cityName" placeholder="İstanbul" />
          </div>
          <div class="ui input labeled">
            <input
              type="number"
              name="amountOfMoney"
              placeholder="25"
            />
            <div class="ui label"><i class="lira sign icon"></i></div>
          </div>
          <div class="ui input labeled">
            <div class="ui label"><i class="credit card outline icon"></i></div>
            <input type="number" name="cardNumber" placeholder="xxxx xxxx xxxx xx xx" />
          </div>
          <div class="ui input flexbox">
            <input
              type="month"
              name="expiredDate"
              value="2022-12"
              id="expiredDate"
            />
            <input type="number" name="cvv" placeholder="xxx" minlength="000" maxlength="999" />
          </div>
          <div>
            <button
            class="notImplemented ui right labeled icon button right floated"
          >
            <i class="right arrow icon"></i>
            Top Up!
          </button>
          </div>
        </div>
    </div>
    <h2>
      <strong>Hi UserG8 ✋ Your current balance is <i>12.48₺.</i></strong>
    </h2>
  </div>
</template>

<!-- 
    Form Yapısı
name    surname
phone number
city name
amount of money
card number
expired date    cvv
 -->

<script>
import { notImplementedYet } from "./../services/helpers";
import Modal from './Modal'
export default {
  components: {
    Modal
  },
  methods: {
    notImplementedYet
  }
};
</script>

<style>
.form{
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 2.1rem;
    width: 85%;
    margin: 0 auto;
}

.flexbox{
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
}
</style>
