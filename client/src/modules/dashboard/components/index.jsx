import React from 'react';
import moment from 'moment';

import Container from '../../../components/container';
import Card from '../../../components/card';
import { Bar, MiniArea } from 'ant-design-pro/lib/Charts';

import './styles.scss';

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1} xxx`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}

const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 200; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.floor(Math.random() * 100) + 10,
  });
}

const DashBoard = () => {
  return (<Container>
        <Container.Col colSpan={12}>
                <Card>
                    <Card.Header>
                        Thống kê
                    </Card.Header>

                    <Card.Body>
                    <Bar height={400} title="Các khu vực" data={salesData} />
                    <MiniArea line title="Biến động theo thời gian" color="#cceafe" height={400} data={visitData} />
                    </Card.Body>
                    
                    <Card.Footer>
                    
                    </Card.Footer>
                </Card>
                
            </Container.Col>
        </Container>
    );
};

export default DashBoard;