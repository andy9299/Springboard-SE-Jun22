describe("helpers test (with setup and tear-down)", function () {
    beforeEach(function () {
        billAmtInput.value = 100;
        tipAmtInput.value = 100;
        submitPaymentInfo();
    });

    it('should sum payments given a type on sumPaymentTotal()', function () {
        billAmtInput.value = 300;
        tipAmtInput.value = 200;
        submitPaymentInfo();
        expect(sumPaymentTotal('billAmt')).toEqual(400);
        expect(sumPaymentTotal('tipAmt')).toEqual(300);
        expect(sumPaymentTotal('tipPercent')).toEqual(167);
    });

    it('should calculate tip percent on calculateTipPercent()', function () {
        expect(calculateTipPercent(100, 10)).toEqual(10);
        expect(calculateTipPercent(75, 25)).toEqual(33);
    });

    it('should append a td element to a html tr element on appendTd()', function () {
        let newTr = document.createElement('tr');
        appendTd(newTr, 'stuff');
        expect(newTr.children.length).toEqual(1);
        expect(newTr.firstChild.innerText).toEqual('stuff');
    });

    afterEach(function () {
        allPayments = {};
        paymentId = 0;
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });
});
