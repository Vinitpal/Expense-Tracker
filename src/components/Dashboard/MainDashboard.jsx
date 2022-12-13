import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import {
  Modal,
  Grid,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
} from "@nextui-org/react";
import UpdateBalanceModal from "./UpdateBalanceModal";

const MainDashboard = ({ user, loadingUser, setUser }) => {
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const balanceHandler = () => setShowBalanceModal(true);

  const closeBalanceHandler = () => {
    setShowBalanceModal(false);
    console.log("closed");
  };

  const HandleBalanceEdit = () => {
    console.log("balance edit");
  };

  return (
    <div className="main-dashboard">
      <div className="expenses">
        {/* current balance */}
        <Grid.Container gap="2">
          <Grid>
            <Button
              icon={<HiOutlineCurrencyRupee size={"20px"} />}
              color="success"
              onPress={balanceHandler}
            >
              {!loadingUser && user.balance}
              <div className="icon">
                <FiEdit />
              </div>
            </Button>
            <UpdateBalanceModal
              visible={showBalanceModal}
              closeHandler={closeBalanceHandler}
              setShowBalanceModal={setShowBalanceModal}
              setUser={setUser}
            />
          </Grid>

          {/* amount expended */}
          <Grid>
            <Button
              icon={<HiOutlineCurrencyRupee size={"20px"} />}
              bordered
              color="primary"
            >
              2000
            </Button>
          </Grid>
        </Grid.Container>

        {/* add new record */}
        <div>
          <Button
            icon={<IoIosAddCircleOutline size={"20px"} />}
            color="success"
          >
            Add New Record
          </Button>
        </div>
      </div>

      <div className="expense-table">{/* table */}</div>
    </div>
  );
};

export default MainDashboard;
