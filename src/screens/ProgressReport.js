import { View, Text, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Appbar, Button, Provider } from "react-native-paper";
import { useNavigation, useIsFocused } from "@react-navigation/native"; // Import useIsFocused
import { DataTable } from "react-native-paper";
import axios from "axios";
import { apiUrl } from "../lib/url";

const ProgressReport = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Use useIsFocused hook to determine if the component is focused
  const [data, setData] = useState([]);

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([5, 10, 15]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  useEffect(() => {
    fetchData();
  }, [isFocused]); // Refetch data when the component is focused

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user`);
      console.log(res.data);
      const { user } = res.data;
      setData(user);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(data);
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data.length);

  return (
    <Provider>
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Go Back" />
        </Appbar.Header>
        <View style={{ padding: 10 }}>
          <View style={{ marginTop: 20 }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>

                {/* Corrected typo */}
              </DataTable.Header>

              {data &&
                data.slice(from, to).map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.fullName}</DataTable.Cell>
                    <DataTable.Cell>{item.email}</DataTable.Cell>
                    <DataTable.Cell>
                      <Button
                        onPress={() =>
                          navigation.navigate("AddProgress", { id: item.id })
                        }
                      >
                        Add Progress
                      </Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}

              <DataTable.Pagination
                page={page}
                numberOfPages={Math.ceil(data.length / itemsPerPage)}
                onPageChange={(page) => setPage(page)}
                label={`${from + 1}-${to} of ${data.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                numberOfItemsPerPage={itemsPerPage}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls
                selectPageDropdownLabel={"Rows per page"}
              />
            </DataTable>
          </View>
        </View>
      </View>
    </Provider>
  );
};

export default ProgressReport;
