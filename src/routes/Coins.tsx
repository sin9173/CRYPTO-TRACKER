import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import { fetchCoins } from '../api';

const Container = styled.div`
    padding: 0px 20px;
`;

const Header = styled.div`
    height : 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px;

    a {
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }

    &:hover {
        a {
            color:${props => props.theme.accentColor};
        }
    }
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;


const coins = [{
    "id": "btc-bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "is_new": false,
    "is_active": true,
    "type": "coin"
    }];


const Title = styled.h1`
    color : ${props => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
`;


interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
    logo: string
}

const Coins = () => {
    // const [coins, setCoins] = useState<CoinInterface[]>([]);
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     (() => console.log(1))();
    //     (async() => {
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0, 100));
    //         setLoading(false);
    //     })();
    // }, []);

const { isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);

    console.log(coins);

    return (<Container>
        <Header>
            <Title>코인</Title>
        </Header>
        {isLoading ? <Loader>Loading...</Loader> :
        <CoinList>
            {
                data?.slice(0, 100).map(coin => 
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={{ name : coin.name }}>
                        <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}/>
                        {coin.name} &rarr;
                    </Link>
                </Coin>)
            }
        </CoinList>}
        <h1>Coins</h1>
    </Container>)
}

export default Coins;