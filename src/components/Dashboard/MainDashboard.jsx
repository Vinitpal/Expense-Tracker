import React from "react";
import { Button, Grid } from "@nextui-org/react";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

const MainDashboard = () => {
  return (
    <div className="main-dashboard">
      <div className="expenses">
        {/* current balance */}

        <Grid.Container gap="2">
          <Grid>
            <Button
              icon={<HiOutlineCurrencyRupee size={"20px"} />}
              color="success"
            >
              1500
              <div className="icon">
                <FiEdit />
              </div>
            </Button>
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
