import styled from 'styled-components'

export const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f5f5f5;

  .ant-btn-default {
    border-radius: 40px;
    background-color: #4d186e;
    color: #fff;
    border: none;
    font-size: 16px;
    font-weight: 500;
    padding: 6px 25px;
    height: fit-content;
    width: fit-content;
    &:hover {
      color: #fff;
    }
  }

  .ant-form-item-control-input-content {
    width: 100%;
    text-align: center;
  }
  .ant-spin-container {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    li {
      font-size: 16px;
      border: 1px solid #d9d9d9;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      list-style: none;
    }
  }
`
