import styled from 'styled-components';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

const AmountDiv = styled.div`
  font-size: 34px;
  align-self: flex-end;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: auto;
  margin-bottom: auto;
  text-align: right;
  font-variant-numeric: tabular-nums;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Currency = styled.div`
  font-size: 0.7em;
`;

export const Total = () => {
  const totalRep = nodecg.Replicant('total');
  const [amount, setAmount] = useState({ raw: 0, formatted: '0' });
  const localAmount = { raw: 0 };

  useEffect(() => {
    const ctx = gsap.context(() => {
      totalRep.on('change', (newVal) => {
        if (typeof newVal != 'undefined') {
          gsap.to(localAmount, {
            duration: 5,
            raw: newVal.raw,
            roundProps: 'raw',
            ease: 'power4',
            onUpdate: () => {
              setAmount({
                raw: localAmount.raw,
                formatted: localAmount.raw.toLocaleString('en-US', {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                }),
              });
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <AmountDiv>
      {amount.formatted}
      <Currency>PLN</Currency>
    </AmountDiv>
  );
};

export default Total;