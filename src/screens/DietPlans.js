import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button, Provider } from "react-native-paper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { DataTable } from "react-native-paper";
import axios from "axios";
import { apiUrl } from "../lib/url";

const DietPlans = () => {
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
      const res = await axios.get(`${apiUrl}/diet`);
      const { diet } = res.data;
      setData(diet);
    } catch (error) {
      console.log(error);
    }
  };

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, data?.length || 1);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const onDelete = async (id) => {
    try {
      const res = await axios.delete(`${apiUrl}/diet/${id}`);
      const { message } = res.data;
      alert(message);
      navigation.navigate("Admin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            // Put your delete logic here
            onDelete(id);
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };
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
          <Button
            mode="outlined"
            onPress={() => navigation.navigate("AddDiet")}
          >
            Add
          </Button>
          <View style={{ marginTop: 20 }}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>
                {/* Corrected typo */}
              </DataTable.Header>

              {data &&
                data.slice(from, to).map((item) => (
                  <DataTable.Row key={item.id}>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>
                      <Button onPress={() => handleDelete(item.id)} color="red">
                        Delete
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

export default DietPlans;
