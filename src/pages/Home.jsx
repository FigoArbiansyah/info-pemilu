import React, { useSyncExternalStore } from 'react';
import axios from 'axios';
import DATA_TPS from '../data/tps2.json';
import Footer from '../components/Footer';

const { useState, useEffect } = React;

const Home = () => {
  const tpsUrl = 'https://kawalpemilu.org/assets/tps2.json';
  const [listTPS, setListTPS] = useState([]);
  const [error, setError] = useState();
  const [data, setData] = useState({});

  let _totalPas1 = [];
  let _totalPas2 = [];
  let _totalPas3 = [];

  const [totalPas1, setTotalPas1] = useState([]);
  const [totalPas2, setTotalPas2] = useState([]);
  const [totalPas3, setTotalPas3] = useState([]);
  const [totalSemuanya, setTotalSemuanya] = useState([]);

  const _getTps = async () => {
    try {
      const names = DATA_TPS?.id2name;
      const tpsKeys = Object.keys(names);
      const tps = [];
      tpsKeys?.map((key) => {
        if (key <= 99) {
          tps?.push({
            id: key,
            label: names?.[key],
          });
        }
      });
      console.log(tps);
      setListTPS(tps);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const _getCountData = async () => {
    const url = `https://kp24-fd486.et.r.appspot.com/h?id=`;
    try {
      const response = await axios.get(url);
      const data = response?.data?.result?.aggregated;
      setData(data);
      console.log({ data });
    } catch (error) {
      console.log(error);
      setError(error);
    }
  }

  const _getPersentase = (total, currentPaslon) => (currentPaslon / total * 100).toFixed(2) + "%";

  const _getNilaiTerbesar = (data1, data2, data3) => {
    let terbesar;
    if (data1 >= data2 && data1 >= data3) {
      terbesar = data1;
    } else if (data2 >= data1 && data2 >= data3) {
      terbesar = data2;
    } else {
      terbesar = data3;
    }
    return terbesar;
  }

  const _generateTotalData = (array) => {
    return array.reduce(function(total, current) {
      return total + current;
    }, 0);
  }

  const nilaiTerbesar = _getNilaiTerbesar(
    _generateTotalData(totalPas1),
    _generateTotalData(totalPas2),
    _generateTotalData(totalPas3),
  );

  useEffect(() => {
    _getTps();
    _getCountData();
  }, []);

  useEffect(() => {
    setTotalPas1(_totalPas1);
    setTotalPas2(_totalPas2);
    setTotalPas3(_totalPas3);

    setTotalSemuanya(_totalPas1.concat(_totalPas2).concat(_totalPas3));
  }, [_totalPas1, _totalPas2, _totalPas3]);

  useEffect(() => {
    setTotalSemuanya(totalPas1.concat(totalPas2).concat(totalPas3));
  }, [totalPas1, totalPas2, totalPas3]);


  return (
    <main className='min-h-screen relative'>
      <section className='min-h-[50vh] bg-blue-500 py-10 md:px-20 px-6 grid items-center'>
        <div className='max-md:flex flex-col items-center'>
          <h2 className="text-4xl font-semibold text-white uppercase">Info Pemilu</h2>
          <p className="mt-5 text-slate-50 text-lg max-md:text-center">
            Info pemilu adalah website yang menampilkan data hasil pemilu, yang datanya diambil dari situs <a href="https://kawalpemilu.org" target="_blank" rel="noopener noreferrer" className='font-semibold underline'>kawalpemilu.org</a>.
            <br />
            Data yang ditampilkan adalah data sementara yang akan terus diperbarui.
          </p>
          <a href="#rekap-data" className='inline-block mt-10 bg-white rounded py-3 px-5 text-lg hover:scale-105 transition-all ease duration-300 active:scale-75'>
            <span className='text-slate-800'>Lihat Data</span>
          </a>
        </div>
      </section>
      <section className='bg-white py-10 md:px-20 px-6 relative'>
        <h3 className="text-xl mb-5 text-gray-800">Total Suara Diraih</h3>
        <div className="grid md:grid-cols-3 gap-2">
          <div className={`p-5 ${nilaiTerbesar === _generateTotalData(totalPas1) ? 'bg-emerald-100' : 'bg-slate-100'}`}>
            <h3 className="text-xl mb-3 font-semibold text-gray-800">Anies - Muhaimin</h3>
            <h2 className="text-4xl font-normal text-gray-800">
              {_getPersentase(_generateTotalData(totalSemuanya), _generateTotalData(totalPas1))}
            </h2>
            <p className='text-lg mt-2'>
              {_generateTotalData(totalPas1)?.toLocaleString()}
            </p>
          </div>
          <div className={`p-5 ${nilaiTerbesar === _generateTotalData(totalPas2) ? 'bg-emerald-100' : 'bg-slate-100'}`}>
            <h3 className="text-xl mb-3 font-semibold text-gray-800">Prabowo - Gibran</h3>
            <h2 className="text-4xl font-normal text-gray-800">
              {_getPersentase(_generateTotalData(totalSemuanya), _generateTotalData(totalPas2))}
            </h2>
            <p className='text-lg mt-2'>
              {_generateTotalData(totalPas2)?.toLocaleString()}
            </p>
          </div>
          <div className={`p-5 ${nilaiTerbesar === _generateTotalData(totalPas3) ? 'bg-emerald-100' : 'bg-slate-100'}`}>
            <h3 className="text-xl mb-3 font-semibold text-gray-800">Ganjar - Mahfud</h3>
            <h2 className="text-4xl font-normal text-gray-800">
              {_getPersentase(_generateTotalData(totalSemuanya), _generateTotalData(totalPas3))}
            </h2>
            <p className='text-lg mt-2'>
              {_generateTotalData(totalPas3)?.toLocaleString()}
            </p>
          </div>
        </div>
      </section>
      <section id='rekap-data' className='min-h-[50vh] bg-white py-10 md:px-20 px-6 relative'>
        <div className='overflow-x-auto relative'>
          <table className='w-full text-left relative'>
            <thead className='sticky top-0 w-full'>
              <tr>
                <th rowSpan={2}>Provinsi</th>
                <th colSpan={3} className='text-center'>Jumlah Suara Pasangan Calon</th>
              </tr>
              <tr>
                {/* <th></th> */}
                <th className='text-center'>01</th>
                <th className='text-center'>02</th>
                <th className='text-center'>03</th>
              </tr>
            </thead>
            <tbody>
              {listTPS?.map((tps, i) => {
                const item = data?.[tps?.id]?.[0];
                
                const total = item?.pas1 + item?.pas2 + item?.pas3;
                const nilaiTerbesar = _getNilaiTerbesar(item?.pas1, item?.pas2, item?.pas3);

                // mendapatkan total data
                _totalPas1.push(item?.pas1);
                _totalPas2.push(item?.pas2);
                _totalPas3.push(item?.pas3);

                // if (i === listTPS.length - 1) {
                //   setTotalPas1(_totalPas1)
                //   setTotalPas2(_totalPas2)
                //   setTotalPas3(_totalPas3)
                // } else {
                //   console.log('sedang dicari')
                // }

                return (
                  <tr key={tps?.id}>
                    <td>{tps?.label}</td>
                    <td className={`text-center ${nilaiTerbesar == item?.pas1 && 'bg-emerald-100'}`}>
                      <span>
                        {item?.pas1?.toLocaleString()}
                      </span>
                      <span className='font-semibold'>&nbsp;({_getPersentase(total, item?.pas1)})</span>
                    </td>
                    <td className={`text-center ${nilaiTerbesar == item?.pas2 && 'bg-emerald-100'}`}>
                      <span>
                        {item?.pas2?.toLocaleString()}
                      </span>
                      <span className='font-semibold'>&nbsp;({_getPersentase(total, item?.pas2)})</span>
                    </td>
                    <td className={`text-center ${nilaiTerbesar == item?.pas3 && 'bg-emerald-100'}`}>
                      <span>
                        {item?.pas3?.toLocaleString()}
                      </span>
                      <span className='font-semibold'>&nbsp;({_getPersentase(total, item?.pas3)})</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Home