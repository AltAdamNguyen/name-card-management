//import liraries
import React from 'react';
import { Button, Image, Input, Card, Container, Grid, Text, Spacer } from "@nextui-org/react";
import './styles.css';
import { ImgUrl } from '../../constants/ImgUrl';
// create a component
const SignIn = () => {
    return (
        <Container className='signin_container'>
            <Card className='body'>
                <Grid.Container gap={2} alignItems='center'>
                    <Grid.Container direction='column' xs alignItems='center'>
                        <Grid xs>
                            <Text h1 color='#828282'>Welcome back</Text>
                        </Grid>
                        <Spacer y={2} />
                        <Grid className='body_formSignIn_input' xs direction='column'>
                            <Input clearable label="Tên đăng nhập" placeholder="name@domain.com" type='email' bordered color='primary'/>
                            <Spacer y={1} />
                            <Input.Password clearable label="Mật khẩu" placeholder="Tối thiểu 8 kí tự" type='password' bordered color='primary'/>
                        </Grid>
                        <Grid>
                            <Spacer y={1.5} />
                            <Button>Sign In</Button>
                        </Grid>
                    </Grid.Container>
                    <Grid xs>
                        <Image src={ImgUrl.imgLogin} />
                    </Grid>
                </Grid.Container>
            </Card>
        </Container>
    );
};

//make this component available to the app
export default SignIn;
