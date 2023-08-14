import { styled } from "styled-components";

export default styled.div`
    overflow: hidden;
    box-shadow: 0 2px 20px grey;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    cursor: pointer;

    transition: transform 200ms ease-in;
    background-color: #FFF;

    img {
        height: 15rem;
        width: 100%;
        object-fit: cover;
    }

    h2 {
        margin: 0;
        padding: 1rem;
    }

    p {
        padding: 0 1rem;
    }

    div>div {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
    }

    .contract {
        cursor: default;
    }

    &:hover {
        transform: scale(1.01);
    }

    button {
        width: 25%;
        min-width: 100px;
        padding: 1rem;
        font-family: inherit;
        font-weight: bold;
        font-size: 1rem;
        margin: 1rem;
        border: 2px solid #A32728;
        background: transparent;
        color: #A32728;
        border-radius: 5px;
        transition: background 200ms ease-in, color 200ms ease-in;

        &:hover {
            background: #A32728;
            color: #FFF;
            cursor: pointer;
        }
    }

    #cancel-btn {
        color: #FFF;
        background: #A32728;

        &:hover {
            color: #A32728;
            background: #FFF;
        }
    }

    #change-btn {
        border-color: #FFA500;
        color: #FFF;
        background: #FFA500;

        &:hover {
            color: #FFA500;
            background: #FFF;
        }
    }

    .initial {
        position: relative;
    }

    .active-contract {
        width: 100%;
        position: absolute;
        background-color: #A32728;
        color: #FFF;
    }
`;