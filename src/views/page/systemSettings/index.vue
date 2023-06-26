<template>
  <div class="container">
    <div class="calculator">
      <!-- 显示器 -->
      <div class="display">
        <div class="showPanel">
          <!-- <input
            class="inputArea"
            type="text"
            disabled
            readonly
            v-model="inputValue"
          /> -->
          <input
            v-model="resultValue"
            class="showArea"
            type="text"
            placeholder="0"
            disabled
            readonly
          />
        </div>
      </div>
      <!-- 按键面板 -->
      <div class="keyPanel">
        <div class="panelArea">
          <button @click="getValue('2')">2</button>
          <button @click="getValue('4')">4</button>
          <button @click="getValue('9')">9</button>
        </div>
        <div class="panelArea">
          <button @click="getValue('6')">6</button>
          <button @click="getValue('1')">1</button>
          <button @click="getValue('5')">5</button>
        </div>
        <div class="panelArea">
          <button @click="getValue('8')">8</button>
          <button @click="getValue('3')">3</button>
          <button @click="getValue('0')">0</button>
        </div>

        <div class="panelArea">
          <button @click="getValue('7')">7</button>
          <button @click="del">←</button>
          <button @click="clearValue">C</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Calculator',
    data() {
      return {
        inputValue: '', // 计算输入
        resultValue: '', // 计算结果
        firstValue: '',
        secondValue: '',
        isAddOperation: false,
        isHaveSecondValue: false,
      }
    },
    methods: {
      // 点击按键获取值
      getValue(value) {
        if (this.isAddOperation) {
          this.secondValue += value
          this.resultValue = this.secondValue
          this.isHaveSecondValue = true
        } else {
          this.resultValue += value
          this.firstValue = this.resultValue
          this.inputValue = this.firstValue
        }
      },

      // C --- 清空
      clearValue() {
        this.inputValue = ''
        this.resultValue = ''
      },

      // ← --- 回退
      del() {
        this.inputValue = this.inputValue.slice(0, this.inputValue.length - 1)
        this.resultValue = this.inputValue
      },
    },
  }
</script>

<style scoped>
  .container {
    padding: 15px;
  }

  .calculator {
    width: 450px;
    height: 495px;
    box-sizing: border-box;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px 0px;
    /* -webkit-box-shadow: 5px 5px 5px;
  -moz-box-shadow: 5px 5px 5px; */
    /* box-shadow: 5px 5px 5px; */
  }

  .display {
    width: 91%;
    height: 75px;
    background-color: #8abcd1;
    margin: 0 auto;
    padding: 6px;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 10px;
  }

  .showPanel {
    width: 98.5%;
    height: 60px;
    background-color: #eef7f2;
    margin: 0px auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
  }
  .inputArea {
    display: block;
    width: 94.5%;
    height: 60px;
    background-color: #eef7f2;
    border: none;
    font-size: 18px;
    text-align: right;
  }
  .showArea {
    display: block;
    width: 94.5%;
    height: 60px;
    margin-top: 0;
    background-color: #eef7f2;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 36px;
    text-align: right;
  }

  .keyPanel {
    width: 90%;
    height: 420px;
    /* background-color: #8abcd1; */
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 5px;
    margin: 10px auto;
    border: 1px rgb(201, 204, 208) solid;
  }

  .panelArea {
    width: 100%;
    height: 98px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    margin-top: 1.5px;
    border-radius: 5px;
  }

  button {
    display: block;
    width: 125px;
    height: 90px;
    font-size: 28px;
    font-weight: bolder;
    border-radius: 15px;
    background-color: #72b6d2;
    color: #ffffff;
    border: none;
  }
</style>
