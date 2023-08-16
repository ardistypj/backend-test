import supertest from 'supertest';
const request = supertest('0.0.0.0:4005/api/');
import {
    expect
} from 'chai';
import { v4 as uuidv4 } from 'uuid';



describe('API TEST', () => {

    it('CREATE CUSTOMER AND CUSTOMER ADDRESS', () => {
        const data = {
            customer_name: 'ardisty test',
            address: 'somewhere',
        };
            
        return request
            .post('customer')
            .send(data)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.ok).to.eq(true);
            });
        });

    it('CREATE PAYMENT METHOD', () => {
        const data = {
            name: 'Bank Transfer',
            is_active: true,
        };
            
        return request
            .post('paymentMethod')
            .send(data)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.ok).to.eq(true);
            });
        });
    
    it('CREATE PRODUCTS', () => {
        const data = {
            name: 'ROKOK',
            price: 80000,
        };
            
        return request
            .post('product')
            .send(data)
            .then((res) => {
                expect(res.status).to.eq(200);
                expect(res.ok).to.eq(true);
            });
        });

        it('CREATE TRANSACTION', () => {
            const data ={ 
            customer_id: uuidv4(),
            customer_address_id: uuidv4(),
            employer_name: "jubran",
            products: [
                {
                    id: uuidv4(),
                    qty: "5",
                    payment_method_id: uuidv4()
                },
                {
                    id: uuidv4(),
                    qty: "5",
                    payment_method_id: uuidv4()
                }
            ]
        };
                
            return request
                .post('transaction')
                .send(data)
                .then((res) => {
                    expect(res.status).to.eq(200);
                    expect(res.ok).to.eq(true);
                });
            });
});