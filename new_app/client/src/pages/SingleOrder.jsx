import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { findPatient } from '../apis/patientAPIs';
import { useAuthToken } from '../apis/useAuthToken';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/spinners/Loading';
import { deleteSingleOrder, getOrder } from '../apis/orderAPIs';
import { getPrescriptions } from '../apis/prescriptionAPIs';
import { url } from '../config/config';
import Pres from '../components/popups/single_order_popups/Pres';
import AddPres from '../components/popups/single_order_popups/AddPres';

function SingleOrder() {
  const [addPresPopup, setAddPresPopup] = useState(false);

  const token = useAuthToken();
  const params = useParams();
  const navigate = useNavigate();

  const pId = params.Pid;
  const oId = params.Oid;

  const [patient, setPatient] = useState('');
  const [order, setOrder] = useState('');
  const [presIds, setPresIds] = useState([]);
  const [prescriptions, setPrescriptions] = useState('');
  const [canShow, setCanShow] = useState(false);

  const fetchPatient = async () => {
    if (token) {
      const response = await findPatient(token, pId);
      setPatient(response.data.patient);
    }
  };

  const fetchOrder = async () => {
    if (token) {
      const response = await getOrder(token, oId);
      setOrder(response.data);
      setPresIds(response.data.prescriptions);
    }
  };

  const fetchPrescriptions = async () => {
    //console.log(presIds);
    if (token) {
      const response = await getPrescriptions(token, [presIds]);
      setPrescriptions(response.data);
    }
  };

  const onPresClick = () => {
    setCanShow(true);
    fetchPrescriptions();
  };

  const onHideClick = () => {
    setCanShow(false);
  };

  useEffect(() => {
    fetchPatient();
    fetchOrder();
    fetchPrescriptions();
  }, [token, addPresPopup]);

  const deleteOrder = async () => {
    if (token) {
      await deleteSingleOrder(token, oId);
      navigate(`../patient/${pId}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  if (!patient && !order) return <Loading />;

  return (
    <div className="flex items-start justify-start h-full">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />
        <div className="flex flex-col m-5 mt-28 md:mt-8">
          <div className="flex items-center justify-between">
            <Link to={`../patient/${pId}`}>
              <h1 className="text-2xl font-semibold tracking-wide capitalize">
                {patient.name}
              </h1>
            </Link>

            <button onClick={deleteOrder} className="capitalize btn_delete">
              delete
            </button>
          </div>

          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">
                ordered date
              </h2>
              <h1 className="text-lg font-semibold sm:text-xl">
                {formatDate(order.date)}
              </h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">
                order number{' '}
              </h2>
              <h1 className="text-xl font-semibold">{order.orderNumber}</h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">
                bill number{' '}
              </h2>
              <h1 className="text-xl font-semibold">{order.billNumber}</h1>
            </div>
          </div>

          <div className="flex w-full mt-10">
            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">lenses </h2>
              <div className="flex items-center justify-start">
                {order.lenses &&
                  order.lenses.map((lense) => (
                    <>
                      <h1 className="mr-3 text-lg font-semibold capitalize sm:text-xl">
                        {lense}
                      </h1>
                    </>
                  ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-10 md:grid-cols-2">
            <div className="flex flex-col items-start justify-start">
              <h2 className="text-sm text-purple-500 capitalize">frame </h2>
              {order.frameImg !== '' ? (
                <img
                  src={order.frameImg}
                  className="object-cover w-full h-32 mt-2 md:pr-5"
                  alt=""
                />
              ) : (
                <p className="italic">- no frame photo added - </p>
              )}
            </div>
            <div className="mt-5 md:mt-5">
              <p className="font-semibold">
                {order.frameDesc ? (
                  order.frameDesc
                ) : (
                  <p className="italic">- no frame description added - </p>
                )}
              </p>
            </div>
          </div>

          <div className="mt-10">
            {canShow ? (
              <button
                onClick={onHideClick}
                className="w-full capitalize btn md:w-fit"
              >
                hide prescriptions
              </button>
            ) : (
              <button
                onClick={onPresClick}
                className="w-full capitalize btn md:w-fit"
              >
                show prescriptions
              </button>
            )}
          </div>

          {prescriptions && canShow && (
            <>
              <div className="justify-start w-full my-5 ">
                <button
                  onClick={() => setAddPresPopup(true)}
                  className="w-full capitalize md:w-fit btn_green"
                >
                  add prescription
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {prescriptions.map((prescription) => (
                  <>
                    <div className="p-5 mt-10 ">
                      <Pres pres={prescription} />
                    </div>
                  </>
                ))}
              </div>
            </>
          )}

          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-col ">
              <h2 className="text-sm text-purple-500 capitalize">price </h2>
              <h1 className="text-xl font-semibold">{order.price}</h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-sm text-green-500 capitalize">advance</h2>
              <h1 className="text-xl font-semibold">{order.advance}</h1>
            </div>

            <div className="flex flex-col ">
              <h2 className="text-sm text-red-500 capitalize">balance </h2>
              <h1 className="text-xl font-semibold">{order.balance}</h1>
            </div>
          </div>

          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-col ">
              <h2 className="text-sm text-purple-500 capitalize">
                order status{' '}
              </h2>
              <h1 className="text-xl font-semibold">{order.status}</h1>
            </div>

            <div></div>
            <div></div>
          </div>

          {order.status !== 'order_accepted' ? (
            <div className="grid grid-cols-3 mt-10">
              {order.sentDate && (
                <div className="flex flex-col ">
                  <h2 className="text-sm text-purple-500 capitalize">
                    sent date
                  </h2>
                  <h1 className="text-lg font-semibold sm:text-xl">
                    {formatDate(order.sentDate)}
                  </h1>
                </div>
              )}

              {order.receivedDate && (
                <div className="flex flex-col ">
                  <h2 className="text-sm text-purple-500 capitalize">
                    sent date
                  </h2>
                  <h1 className="text-lg font-semibold sm:text-xl">
                    {formatDate(order.receivedDate)}
                  </h1>
                </div>
              )}

              {order.deliveredDate && (
                <div className="flex flex-col ">
                  <h2 className="text-sm text-purple-500 capitalize">
                    sent date
                  </h2>
                  <h1 className="text-lg font-semibold sm:text-xl">
                    {formatDate(order.deliveredDate)}
                  </h1>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}

          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-col ">
              <h2 className="text-xs text-purple-500 capitalize">
                special notes
              </h2>
              <h1 className="text-xl font-semibold">{order.specialNote}</h1>
            </div>
          </div>
        </div>
      </div>

      <AddPres
        addTrigger={addPresPopup}
        setAddTrigger={setAddPresPopup}
        oId={oId}
        pId={pId}
      ></AddPres>
    </div>
  );
}

export default SingleOrder;
