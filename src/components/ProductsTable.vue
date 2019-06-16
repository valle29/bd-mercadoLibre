<template class="mt-5">
    <div class="mt-5" style="margin-top: -25px">
        <mdb-container class="free-bird mt-5">
            <mdb-col class="mx-auto">
                <mdb-jumbotron class="pt-4">
                    <mdb-card>
                        <mdb-card-body>
                            <mdb-tbl>
                                <mdb-tbl-head>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Asin</th>
                                        <th scope="col">Titulo</th>
                                        <th scope="col">Margen</th>
                                        <th scope="col">P. ML</th>
                                        <th scope="col">P. Prov</th>
                                        <th scope="col"></th>
                                    </tr>
                                </mdb-tbl-head>
                                <mdb-tbl-body>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>asda</td>
                                        <td>Titulo del producto que puede estar muy largo o no</td>
                                        <td>Margen</td>
                                        <td>123.23</td>
                                        <td>134.45</td>
                                        <td>
                                            <mdb-btn outline="primary" size="sm" :id="btnEdit" v-on:click="edit()">
                                                <i class="fas fa-pencil-alt mt-0"></i>
                                            </mdb-btn>
                                            <mdb-btn outline="success" size="sm" :id="btnSave" class="hideButon" v-on:click="save()">
                                                <i class="fas fa-save"></i>
                                            </mdb-btn>
                                            <mdb-btn outline="danger" size="sm" :id="btnCancel" class="hideButon" v-on:click="cancel()">
                                                <i class="fas fa-times mt-0"></i>
                                            </mdb-btn>
                                        </td>
                                    </tr>
                                </mdb-tbl-body>
                                </mdb-tbl>
                        </mdb-card-body>
                    </mdb-card>
                </mdb-jumbotron>
            </mdb-col>
        </mdb-container>
    </div>
</template>

<script>
function edit(){
    console.log('Hola');
}

import { mdbContainer, mdbRow, mdbCol, mdbBtn, mdbCard, mdbCardBody, mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue';

export default {
  name: 'Productos',
  components: {
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbBtn,
    mdbCard,
    mdbCardBody,
    mdbTbl,
    mdbTblHead,
    mdbTblBody
  },
  methods: {
      edit () {
          alert('Did something!')
        }
    }
};
</script>

<style scoped>

.hideButon{
    display: none;
}

</style>
