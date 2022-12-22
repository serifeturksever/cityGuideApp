<template>
    <div class="transport-card-container">
        <h2><strong>Kartına bakiye yüklemek artık çok kolay.</strong></h2>
        <form id="bakiye-form">
            <div class="part-1">
                <input type="text" name="name" placeholder="Name" />
                <input type="text" name="surname" placeholder="Surname" />
            </div>
            <div class="part-2">
                <input type="text" name="phoneNumber" placeholder="Phone Number" />
            </div>
            <div class="part-3">
                <input type="text" name="cityName" placeholder="City Name" />
            </div>
            <div class="part-4">
                <input type="number" name="amountOfMoney" placeholder="Amount Of Money" />
            </div>
            <div class="part-5">
                <input type="number" name="cardNumber" placeholder="Card Number" />
            </div>

            <div class="part-6">
                <input type="month" name="expiredDate" value="2022-12" id="expiredDate" />
                <input type="number" name="cvv" placeholder="cvv" />
            </div>

            <input type="submit" value="yükle" @click="this.notImplementedYet" />
        </form>
        <h2><strong>Merhaba UserG8 ✋. Mevcut bakiyen <i>12.48₺</i></strong></h2>
    </div>
</template>

<!-- 
name    surname
phone number
city name
amount of money
card number
expired date    cvv
 -->

<script>
import { notImplementedYet } from './../services/helpers'
export default {
    methods: {
        notImplementedYet
    }
}
</script>

<style>
.transport-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#bakiye-form {
    display: flex;
    flex-direction: column;
    border: 1px solid transparent;
    justify-content: space-evenly;
    width: 50%;
    height: 50vh;
    align-items: center;
    background-color: #A5C9CA;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 24px;
}

#bakiye-form>div {
    width: 50%;
}

.part-1>input {
    width: 45%;
}

.part-1,
.part-6 {
    display: flex;
    justify-content: space-between;
}

.part-2>input,
.part-3>input,
.part-4>input,
.part-5>input {
    width: 100%;
}

#bakiye-form > div > input {
    border-radius: 8px;
    height: 32px;
    padding-left: 4px;
    border: 1px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 1px 3px;
}

#bakiye-form > div > input[type="submit"] {
    padding-left: 16px;
    padding-right: 16px;
}

@media only screen and (max-width: 1180px) {

    .part-1,
    .part-6 {
        display: flex;
        flex-direction: column;
    }

    .part-1 > input,
    .part-6 > input{
        width: 100%;
        margin-top: 5px;
        margin-bottom: 5px;
    }
}

@media only screen and (max-width: 1180px) {
    #bakiye-form {
        width: 90%;
        height: 60vh;
    }
}
</style>