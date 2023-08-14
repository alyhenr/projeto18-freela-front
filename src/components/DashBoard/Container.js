import { styled } from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    background-color: #FFF;
    padding: 8px;
    border-radius: 15px;
    margin-top: 4px;
    box-shadow: 0 2px 20px grey;

    button {
        width: 50%;
        min-width: 100px;
        padding: 0.3rem;
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
        .selected {
            background: #A32728;
            color: #FFF;
            cursor: pointer;
        }
`;
