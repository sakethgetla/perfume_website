import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router";

import { ReactComponent as StarSVG } from "../assets/star.svg";
import { ReactComponent as NotBookmarkedSVG } from "../assets/not_bookmarked.svg";
import { ReactComponent as BookmarkSVG } from "../assets/bookmarked.svg";

const Perfume = (props) => {
  const {
    id,
    name,
    brand,
    scents,
    rating,
    bookmarked,
    addBookmark,
    removeBookmark,
    renderBookmark,
  } = props;

  return (
    <PerfumeContainer onClick={() => props.history.push(`/perfume/${id}`)}>
      <Picture>
        <b>Perfume Picture</b>
      </Picture>

      {/* name + brand  */}
      <NotEditingContainer>
        <Label>{name}</Label>
        {renderBookmark && (
          <SVGContainer noMargin>
            {bookmarked ? (
              <BookmarkSVG
                onClick={e =>
                  removeBookmark(e,{
                    id: id,
                    name: name,
                    scents: scents,
                    rating: rating,
                    bookmarked: false,
                  })
                }
              />
            ) : (
              <NotBookmarkedSVG
                onClick={e =>
                  addBookmark(e,{
                    id: id,
                    name: name,
                    scents: scents,
                    rating: rating,
                    bookmarked: true,
                  })
                }
              />
            )}
          </SVGContainer>
        )}
      </NotEditingContainer>
      <NotEditingContainer>
        <Label brand={"grey"}>{brand}</Label>
      </NotEditingContainer>

      {/* note, rating */}
      <div>
        <ButtonContainer>
          <Note>{scents ? `#${scents}` : "No Note"}</Note>
          <RatingContainer>
            <Rating>{rating} / 5</Rating>
            <StarSVG />
          </RatingContainer>
        </ButtonContainer>
      </div>
    </PerfumeContainer>
  );
};

const PerfumeContainer = styled.div`
  display: flex;
  // flex-grow, flex-shrink, flex-basis
  flex: 1 0 33%;
  flex-direction: column;

  border-radius: 8px;
  padding: 16px;
  background: #f6f6f7;
  align-self: center;

  cursor: pointer;
  :hover {
    box-shadow: 0 4px 8px rgb(32 42 62 / 6%), 0 20px 40px rgb(32 42 62 / 6%);
  }
`;

const Picture = styled.div`
  height: 250px;
  background: #64c7ff;
  border-radius: 8px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin-bottom: 16px;
`;

const NotEditingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  :hover {
    cursor: text;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: black !important;
  margin-top: 8px;
`;

const Note = styled.div`
  display: inline-block;
  margin-right: auto;
  background: #e4eaf7;
  color: #4380f3;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
`;

const SVGContainer = styled.div`
  display: inline-block;
  margin-right: ${(props) => (props.noMargin ? "8px" : "24px")};
  cursor: pointer;
  transform: scale(1.2);
  transition: transform 0.2s;
  display: grid;
  align-content: center;
  justify-content: center;

  :hover {
    transform: scale(1.3);
  }
`;

const Label = styled.div`
  margin-right: auto;
  font-size: 16px;
  color: ${(params) => params.brand};
`;

const RatingContainer = styled.div`
  display: flex;
  justify-self: center;
  align-self: center;
  margin-right: 8px;
`;

const Rating = styled.p`
  font-size: 12px;
  display: inline-block;
  margin: 0;
  margin-right: 16px;
`;
export default withRouter(Perfume);
