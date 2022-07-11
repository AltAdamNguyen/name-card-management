//import liraries
import React, { useState } from 'react';
import { Modal, Text, Card, Grid, Avatar, Button, Popover, Input } from '@nextui-org/react';
import { MdMoreHoriz } from "react-icons/md";
import '../../screen/staff/styles.css';
// create a component
const OrgChart = ({ item }) => {
    const [visible, setVisible] = useState(false);
    return (
        <Grid.Container gap={2} justify="center" alignItems='center' className='card w-80'>
            <Grid xs={4}>
                <Card>
                    <Grid.Container gap={2} direction='row'>
                        <Grid sm={2}>
                            <Avatar text={item.name} size="xl" />
                        </Grid>
                        <Grid direction='column' className='card_content' sm={8}>
                            <Text h3>{item.name}</Text>
                            <Text>{item.role}</Text>
                            <Text>{item.email}</Text>
                        </Grid>
                        <Grid sm={2} justify="flex-end" alignItems='center'>
                            <Popover isBordered>
                                <Popover.Trigger>
                                    <Button light icon={<MdMoreHoriz size={20} />} rounded size={'xs'} />
                                </Popover.Trigger>
                                <Popover.Content>
                                    <Button light onClick={() => setVisible(true)}>Edit</Button>
                                    <Button light>Delete</Button>
                                </Popover.Content>
                            </Popover>
                        </Grid>
                    </Grid.Container>
                </Card>
            </Grid>
            <Grid.Container gap={2} alignItems='center' className='card'>
                {item.childern && item.childern.map((item, index) => {
                    return (
                        <Grid xs={4} key={index}>
                            <Card>
                                <Grid.Container gap={2} direction='row' alignItems='center'>
                                    <Grid sm={2}>
                                        <Avatar text={item.name} size="xl" />
                                    </Grid>
                                    <Grid direction='column' className='card_content' sm={8}>
                                        <Text h3>{item.name}</Text>
                                        <Text>{item.role}</Text>
                                    </Grid>
                                    <Grid sm={2} justify="flex-end">
                                        <Popover isBordered>
                                            <Popover.Trigger>
                                                <Button light icon={<MdMoreHoriz size={20} />} rounded size={'xs'} />
                                            </Popover.Trigger>
                                            <Popover.Content>
                                                <Button light>Edit</Button>
                                                <Button light>Delete</Button>
                                            </Popover.Content>
                                        </Popover>
                                    </Grid>
                                </Grid.Container>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid.Container>
        </Grid.Container>
    );
};

//make this component available to the app
export default OrgChart;
