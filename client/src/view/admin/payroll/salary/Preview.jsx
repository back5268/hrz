import { previewApprovedPayslipApi } from '@api';
import { useGetApi } from '@lib/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Preview = () => {
  const { _id } = useParams();
  const { data } = useGetApi(previewApprovedPayslipApi, { _id }, 'bill', Boolean(_id));

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 'p') {
        console.log('User pressed Ctrl + P');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center"
      style={{ pageBreakInside: 'avoid', backgroundColor: '#FFF', fontFamily: 'sans-serif !important' }}
    >
      {data && typeof data === 'string' && <div style={{ pageBreakAfter: 'always' }} dangerouslySetInnerHTML={{ __html: data }} />}
    </div>
  );
};