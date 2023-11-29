
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Page = styled.div`
    background-color: #fef1f1;
    width: 33%;
    min-height: 100vh;
    justify-content: center;
    margin: 0 auto;
    padding: 20px 0 60px;
    
`
const Wrapper = styled.div`
    align-items:center;
    flex-direction: column;
    display:flex;       
`
const InnerPage = styled.div`
    margin: 70 auto;
    flex-direction: column;
    display: flex;
    justify-content: center;
`
const Team = styled.div`
    font-family: 'Beomsuk', sans-serif;
    font-size: 15px;
    display: flex;
    justify-content: center;
    margin-bottom:30px;
`
const Image = styled.img`
    width: 400px;
    height: auto;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

function AllPage(){

    return(

        <Page>
            <Wrapper>
            <Team>MBTI TEAM PROJECT</Team>
            <InnerPage>
                <StyledLink to="/main"><Image src="./images/friendtest.jpg" alt="Friend Test"></Image></StyledLink>
                <StyledLink to="/mbti"><Image src="./images/mbti.jpg" alt="MBTI Test"></Image></StyledLink>
            </InnerPage>
            </Wrapper>
        </Page>
    )
}
export default AllPage;