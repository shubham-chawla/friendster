import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStar, FaRegStar, FaTrashAlt, FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';

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

const BoxToggle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${props => (props.active ? '#fff' : '#909090')};
    background: ${props => (props.active ? '#909090' : '#fff')};
    border: 1px solid #d7d7d7;
    padding: 5px;
    height: 20px;
    width: 20px;
    border-radius: 2px;
    cursor: pointer;
`;

const Friendster = () => {
    const rows = 2;
    const [friends, makeFriends] = useState([]);
    const [inputVal, setInputVal] = useState('');
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(Math.ceil(friends.length / rows) || 1);

    const addFriend = name => {
        makeFriends([{ id: getID('friend'), name, isFav: false, mutual: 'xx', sex: 'M' }, ...friends]);
        setInputVal('');
    };

    const markFav = friend => makeFriends(friends.map(x => (x.id === friend.id ? { ...x, isFav: !x.isFav } : x)));

    const unfriend = friend => makeFriends(friends.filter(x => x.id !== friend.id));

    const changeGender = friend => makeFriends(friends.map(x => (x.id === friend.id ? { ...x, sex: x.sex === 'M' ? 'F' : 'M' } : x)));

    const getID = (prefix = '') => prefix + '-' + new Date().getTime();

    const getPageIndices = rowsPerPage => [(page - 1) * rowsPerPage, page * rowsPerPage];

    const setOutbounds = () => {
        if (!(friends.slice(...getPageIndices(rows)).length - 1) && lastPage === (Math.ceil(friends.length / rows) || 1)) {
            setLastPage(lastPage - 1 || 1);
            setPage(page - 1 || 1);
        } else {
            setLastPage(Math.ceil((friends.length - 1) / rows) || 1);
        }
    };

    return (
        <div className="max-width-container fcol center margin-t-50">
            <Container>
                <Header>The FriendList</Header>
                <InputField
                    showDivider={!!friends.length}
                    placeholder="Type the name of a friend"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter' && e.target.value.length) {
                            addFriend(e.target.value.trim());
                            setLastPage(Math.ceil((friends.length + 1) / rows) || 1);
                        }
                    }}
                />
                {!!friends.length &&
                    friends.slice(...getPageIndices(rows)).map((x, i) => (
                        <Friends key={i}>
                            <div className="detail fcol">
                                <span className="regular text-bold">{x.name}</span>
                                <div className="frow">
                                    <BoxToggle active={x.sex === 'M'} onClick={() => changeGender(x)}>
                                        M
                                    </BoxToggle>
                                    <BoxToggle active={x.sex === 'F'} onClick={() => changeGender(x)}>
                                        F
                                    </BoxToggle>
                                </div>
                                <span className="small margin-t-5">{x.mutual + ' friends in common'}</span>
                            </div>
                            <div className="actions frow align-items">
                                <Action className="margin-r-5">
                                    {x.isFav ? (
                                        <FaStar className="regular solid pointer" onClick={() => markFav(x)} />
                                    ) : (
                                        <FaRegStar className="regular solid pointer" onClick={() => markFav(x)} />
                                    )}
                                </Action>
                                <Action>
                                    <FaTrashAlt
                                        className="regular solid pointer"
                                        onClick={() => {
                                            unfriend(x);
                                            setOutbounds();
                                        }}
                                    />
                                </Action>
                            </div>
                        </Friends>
                    ))}
            </Container>
            <div className="margin-t-5 frow center" style={{ width: '300px' }}>
                {page > 1 ? (
                    <FaChevronCircleLeft className="regular pointer margin-r-5" onClick={() => setPage(page - 1)} />
                ) : (
                    <FaChevronCircleLeft className="regular margin-r-5 light-gray" />
                )}
                <span className="small">
                    {page}/{lastPage}
                </span>
                {friends.length > rows && page < lastPage ? (
                    <FaChevronCircleRight className="regular pointer margin-l-5" onClick={() => setPage(page + 1)} />
                ) : (
                    <FaChevronCircleRight className="regular light-gray margin-l-5" />
                )}
            </div>
        </div>
    );
};

export default Friendster;
