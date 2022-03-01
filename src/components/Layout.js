import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import useLazyLoad from "../customHook/useLazyLoad";
import ReactLoading from "react-loading";
import { setBultenData } from "../store/dataStore";
import { setCartData } from "../store/cartStore";
import Cart from "./Cart";

const Layout = () => {
  const dispatch = useDispatch();
  const triggerRef = useRef(null);

  const { bultenData } = useSelector((state) => state.dataSlice);
  const { cartData } = useSelector((state) => state.cartSlice);

  const NUM_PER_PAGE = 15;
  const TOTAL_PAGES = bultenData.length / NUM_PER_PAGE || 200;

  const lazyBultenData = (currentPage) => {
    const data = bultenData.slice(
      ((currentPage - 1) % TOTAL_PAGES) * NUM_PER_PAGE,
      NUM_PER_PAGE * (currentPage % TOTAL_PAGES)
    );

    return data;
  };

  const { data } = useLazyLoad({ triggerRef, lazyBultenData });

  const handleChooseSelectedRate = (e, item) => {
    if (e.target.textContent) {
      const cartObj = {
        id: item.id,
        code: item.value.C,
        teams: item.value.N,
        mbs: item?.value?.OCG[1]?.MBS,
        rate: e.target.textContent,
      };

      dispatch(setCartData(cartObj));
    }
  };

  useEffect(() => {
    dispatch(setBultenData());
  }, []);

  return (
    <StyedLayoutContainer>
      <StyledTable>
        <thead>
          <StyledTr>
            <StyledTableTitle color="#e80000">
              Event Count:{bultenData.length}
            </StyledTableTitle>
            <StyledComments data-testid="comment">Yorumlar</StyledComments>
            <StyledTableElement></StyledTableElement>
            <StyledTableElement>1</StyledTableElement>
            <StyledTableElement>x</StyledTableElement>
            <StyledTableElement>2</StyledTableElement>
            <StyledTableElement>Alt</StyledTableElement>
            <StyledTableElement>Üst</StyledTableElement>
            <StyledTableElement>H1</StyledTableElement>
            <StyledTableElement>1</StyledTableElement>
            <StyledTableElement>X</StyledTableElement>
            <StyledTableElement>2</StyledTableElement>
            <StyledTableElement>H2</StyledTableElement>
            <StyledTableElement>1-X</StyledTableElement>
            <StyledTableElement>1-2</StyledTableElement>
            <StyledTableElement>X-2</StyledTableElement>
            <StyledTableElement>Var</StyledTableElement>
            <StyledTableElement>Yok</StyledTableElement>
            <StyledTableElement>+99</StyledTableElement>
          </StyledTr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={item.id}>
              <StyledTr>
                <StyledTableTitle color="#e80000">
                  <StyledTitleNumber>{item.id}</StyledTitleNumber>
                  {item?.value?.D +
                    " " +
                    item?.value?.DAY +
                    " " +
                    item?.value?.LN}
                </StyledTableTitle>
                <StyledComments>Yorumlar</StyledComments>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement>1</StyledTableElement>
                <StyledTableElement>x</StyledTableElement>
                <StyledTableElement>2</StyledTableElement>
                <StyledTableElement>Alt</StyledTableElement>
                <StyledTableElement>Üst</StyledTableElement>
                <StyledTableElement>H1</StyledTableElement>
                <StyledTableElement>1</StyledTableElement>
                <StyledTableElement>x</StyledTableElement>
                <StyledTableElement>2</StyledTableElement>
                <StyledTableElement>H2</StyledTableElement>
                <StyledTableElement>1-X</StyledTableElement>
                <StyledTableElement>1-2</StyledTableElement>
                <StyledTableElement>X-2</StyledTableElement>
                <StyledTableElement>Var</StyledTableElement>
                <StyledTableElement>Yok</StyledTableElement>
                <StyledTableElement>+99</StyledTableElement>
              </StyledTr>
              <StyledTr>
                <StyledTableTitle color={"#333"}>
                  {item?.value?.C + " " + item?.value?.T + " " + item?.value?.N}
                </StyledTableTitle>
                <StyledComments>Yorumlar</StyledComments>
                <StyledTableElement>
                  {item?.value?.OCG[1]?.MBS}
                </StyledTableElement>
                <StyledTableElement
                  data-testid={`home-${index}`}
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[1]?.OC[0]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[1]?.OC[0]?.O}
                </StyledTableElement>
                <StyledTableElement
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[1]?.OC[1]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[1]?.OC[1].O}
                </StyledTableElement>
                <StyledTableElement
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[1]?.OC[2]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[1]?.OC[2]?.O}
                </StyledTableElement>
                <StyledTableElement
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[5]?.OC[25]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[5]?.OC[25]?.O}
                </StyledTableElement>
                <StyledTableElement
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[5]?.OC[26]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[5]?.OC[26]?.O}
                </StyledTableElement>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[2]?.OC[3]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[2]?.OC[3]?.O}
                </StyledTableElement>
                <StyledTableElement
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[2]?.OC[4]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[2]?.OC[4]?.O}
                </StyledTableElement>
                <StyledTableElement
                  onClick={(e) => handleChooseSelectedRate(e, item)}
                  backgroundcolor={
                    cartData.some(
                      (x) =>
                        x.id === item.id &&
                        x.rate == item?.value?.OCG[2]?.OC[5]?.O
                    ) && "yellow"
                  }
                >
                  {item?.value?.OCG[2]?.OC[5]?.O}
                </StyledTableElement>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement></StyledTableElement>
                <StyledTableElement>3</StyledTableElement>
              </StyledTr>
            </React.Fragment>
          ))}
        </tbody>
      </StyledTable>

      <div
        style={{
          display: `flex`,
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={triggerRef}
      >
        <ReactLoading width={48} height={48} type="spin" color="#333" />
      </div>

      <Cart />
    </StyedLayoutContainer>
  );
};

const StyedLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-x: scroll;
  @media (max-width: 1512px) {
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

const StyledTable = styled.table`
  width: %100;
  height: %100;
`;

const StyledTr = styled.tr`
  display: flex;
  flex-direction: row;
  width: %100;
`;

const StyledTableTitle = styled.th`
  width: 360px;
  height: 40px;
  border: 1px solid #e7e7e7;
  display: flex;
  font-size: 18px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 4px;
  color: ${(p) => p.color};
  cursor: pointer;
  @media (max-width: 520px) {
    font-size: 16px;
  }
`;

const StyledTitleNumber = styled.span`
  color: green;
  font-size: 20px;
  margin-right: 4px;
`;

const StyledComments = styled(StyledTableTitle)`
  width: 120px;
  color: #333;
  justify-content: center;
  font-size: 14px;
  padding-left: 0;
  @media (max-width: 520px) {
    font-size: 16px;
  }
`;

const StyledTableElement = styled(StyledComments)`
  width: 60px;
  background-color: ${(p) => p.backgroundcolor};
`;

export default Layout;
