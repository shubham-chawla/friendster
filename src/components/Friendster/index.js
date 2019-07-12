import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 16px;
    background-color: #909090;
    color: #fff;
    height: 50px;
    padding: 10px;
    font-weight: 600;
`;

const InputField = styled.input`
    width: 100%;
    border: none;
    background: #fff;
    height: 40px;
    padding: 10px;
    border-bottom: ${props => props.showDivider && '1px solid #d7d7d7'};
`;

const Friends = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #d7d7d7;
    &:last-child {
        border-bottom: none;
    }
`;

const Action = styled.div`
    display: flex;
    padding: 5px;
    border: 1px solid #d7d7d7;
    border-radius: 2px;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
`;

const Friendster = () => {
    const [friends, makeFriends] = useState([]);
    const [inputVal, setVal] = useState('');
    return (
        <div className="max-width-container">
            <Container>
                <Header>The FriendList</Header>
                <InputField
                    showDivider={!!friends.length}
                    placeholder="Type the name of a friend"
                    value={inputVal}
                    onChange={e => setVal(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value.length) {
                            makeFriends([...friends, { name: e.target.value.trim(), isFav: false, mutual: 'xx' }]);
                            setVal('');
                        }
                    }}
                />
                {!!friends.length &&
                    friends.map((x, i) => (
                        <Friends key={i}>
                            <div className="detail fcol">
                                <span className="regular text-bold">{x.name}</span>
                                <span className="small margin-t-5">{x.mutual + ' friends in common'}</span>
                            </div>
                            <div className="actions frow">
                                <Action className="margin-r-5">
                                    {x.isFav ? (
                                        <i
                                            className="fa fa-star regular solid pointer"
                                            onClick={() => {
                                                makeFriends([...friends.slice(0, i), { ...x, isFav: false }, ...friends.slice(i + 1)]);
                                            }}
                                        />
                                    ) : (
                                        <i
                                            className="fa fa-star-o regular solid pointer"
                                            onClick={() => {
                                                makeFriends([...friends.slice(0, i), { ...x, isFav: true }, ...friends.slice(i + 1)]);
                                            }}
                                        />
                                    )}
                                </Action>
                                <Action>
                                    <i
                                        className="fa fa-trash regular solid pointer"
                                        onClick={() => {
                                            makeFriends([...friends.slice(0, i), ...friends.slice(i + 1)]);
                                        }}
                                    />
                                </Action>
                            </div>
                        </Friends>
                    ))}
            </Container>
        </div>
    );
};

export default Friendster;
