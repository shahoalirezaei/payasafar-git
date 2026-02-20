<template>
    <div class="buyTicket-section">
      <!-- <LazyTicketLevels /> -->
      <div class="buyTicketAction">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 col-md-12 col-sm-12 col-12">
              <div class="buyTicketInfo">
                <div v-if="chairSeatLoader" class="ticketInfoSectionLoader">
                    <v-skeleton-loader type="image"></v-skeleton-loader>
                </div>
                <div v-else>
                    <LazyReservePathGuide :currentStep="2"  />
                    <div class="whiteBox p-4 filterSectionn flex-row" v-for="(d,i) in details" :key="i">
                        <div class="d-flex flex-column w-70">
                            <div class="d-flex flex-column justify-content-start align-items-start">
                                <div class="h4 text-blue mb-5">{{ persianDate }} <span class="fw-light">{{ persianweek }}</span></div>
                                <div class="pathSrcDestSection">
                                    <div class="pathSrcDest">
                                        <div class="d-flex flex-column align-items-center">
                                            <span class="srcText fw-bold">{{ d.boardingPoint.city }}</span>
                                            <div class="fw-medium h6 text-muted">{{ d.time }}</div>
                                        </div>
                                        <div class="hometimeline">
                                            <Icon name="map-marker" />
                                            <div class="busmini">
                                                <NuxtImg src="/img/home/bus-v.webp" alt="اتوبوس" />
                                            </div>
                                            <Icon name="flag" />
                                        </div>
                                        <div class="d-flex flex-column align-items-center">
                                            <span class="destText fw-bold">{{ d.destCity }}</span>
                                            <div class="fw-medium h6 text-muted">{{ d.time }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="buyTicketDetail">
                                <div class="buyTicketCoop">
                                    <small class="text-blue">{{ d.company }}</small>
                                    <small class="buyTicketCoopServiceText ps-1"> {{ d.type }} </small>
                                </div>
                                <div class="buyTicketBetweenCities" v-if="d.betweenCities.length > 0">
                                    <p>
                                        <span class="mdi mdi-information-outline mdi-18px me-1"></span>
                                        بین راهی : 
                                    </p>
                                    <div class="pillGroup">
                                        <small v-for="(c,i) in d.betweenCities" :key="i">
                                            c ،
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="buyTicketPriceDesktop w-30">
                            <div class="d-flex flex-column justify-content-between w-100">
                                <div class="d-flex flex-row justify-content-between w-100 mb-3 border-bottom pb-3">
                                    <span>هر صندلی : </span>
                                    <div>
                                        <span class="fw-bold me-1">{{ d.price.toLocaleString() }}</span>
                                        <small class="text-muted">تومان</small>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-between w-100">
                                    <span>مجموع : </span>
                                    <div>
                                        <strong>{{ d.price.toLocaleString() }}</strong>
                                        <span>تومان</span>
                                    </div>
                                </div>
                            </div>
                            <button type="button" class="mainBtn w-100 rounded-4" @click="confirmAndNext">
                                <span class="mdi mdi-arrow-right mdi-18px me-2"></span>
                                ادامه فرآیند
                            </button>
                        </div>
                    </div>
                </div>
              </div>
              <div class="buyTicketForm">
                <div v-if="chairsArray.length == 0">
                  <div class="ChairForm">
                    <div class="row">
                      <div class="col-12">
                        <div class="d-flex justify-content-between align-items-center pb-2">
                          <h5 class="fw-bold">
                            <span class="mdi mdi-account-multiple"></span>
                            مشخصات مسافران
                          </h5>
                          <div v-if="!timerExpired">
                              <span class="text-dark ms-4">
                                <span class="timer">
                                  <span v-if="minutes < 10">0{{ minutes }}</span><span v-else>{{ minutes }}</span>:<span v-if="seconds < 10">0{{ seconds }}</span><span v-else>{{ seconds }}</span>
                                </span>
                                <span class="mdi mdi-timer-outline"></span>
                              </span>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <div class="col-12">
                        <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                          <div class="personChairName">
                            <!-- <h6 class="fw-bold">
                              1 - بزرگسال
                            </h6> -->
                          </div>
                          <div class="personChairOptions" @click="previousPassengersFuncc(firstPerson)">
                            <div class="addLatestPerson m-0">
                              <span class="mdi mdi-account-plus mdi-18px"></span>
                              <span>مسافران قبلی</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-2 col-12 pe-1">
                        <v-text-field rounded :rules="rules" color="var(--blue-700)" density="comfortable" label="نام" variant="solo" v-model="firstPerson.name"></v-text-field>
                      </div>
                      <div class="col-lg-2 col-12 px-1">
                        <v-text-field rounded :rules="rules" color="var(--blue-700)" density="comfortable" label="نام خانوادگی" variant="solo" v-model="firstPerson.family"></v-text-field>
                      </div>
                      <div class="col-lg-4 col-12 px-1">
                        <v-text-field rounded @update:focused="checkNationalCode" :rules="nationalCodeRules" color="var(--blue-700)" density="comfortable" label="کد ملی (اتباع خارجه)" variant="solo" v-model="firstPerson.nationalCode"></v-text-field>
                      </div>
                      <div class="col-lg-4 col-12 ps-1">
                        <v-text-field rounded @update:focused="checkMobileNumber" :rules="mobileRules" color="var(--blue-700)" density="comfortable" label="شماره موبایل (جهت احراز هویت)" variant="solo" v-model="firstPerson.mobile"></v-text-field>
                      </div>
                      <div class="col-lg-4 col-12 pe-1 position-relative">
                        <v-text-field rounded :rules="rules" color="var(--blue-700)" density="comfortable" label="تاریخ تولد" variant="solo" v-model="firstPerson.birth"></v-text-field>
                        <div class="fullscreenBirth" @click="firstPerson.showDate = true"></div>
                        <ClientOnly>
                            <date-picker class="datepickerInput" :max="global.today" simple format="jYYYY/jMM/jDD" display-format="jYYYY/jMM/jDD" v-model="firstPerson.birth" :show="firstPerson.showDate" @close="firstPerson.showDate = false" />
                        </ClientOnly>
                      </div>
                      <div class="col-lg-2 col-12 px-1">
                        <v-select variant="solo" color="var(--blue-700)" density="comfortable" :items="['ملیت ایرانی', 'ملیت غیر ایرانی']" v-model="firstPerson.nation"></v-select>
                      </div>
                      <div class="col-lg-2 col-12 ps-1">
                        <v-select variant="solo" color="var(--blue-700)" density="comfortable" :items="['مرد', 'زن']" v-model="firstPerson.gender"></v-select>
                      </div>
                      <hr>
                      <div class="col-12">
                        <div class="d-flex flex-row align-items-end justify-content-between">
                          <div class="d-flex flex-column">
                            <div class="h4 text-aaa mb-5">
                              <img src="/img/bus/chair3.svg" width="40">
                              هنوز صندلی انتخاب نشده!
                            </div>
                            <small class="fw-semibold">صندلی های مورد نظر خود را انتخاب کنید</small>
                            <small class="fw-semibold">صندلی ها با اولین کلیک انتخاب و با کلیک بعدی از انتخاب خارج میشوند</small>
                          </div>
                          <div class="d-flex flex-row">
                            <div class="headerBuyTicket">
                              <div class="buyTicketHelp">
                                <div class="chairBoxColumn">
                                  <div class="chairBoxx yourChoise">
                                    <i></i>
                                    <small>انتخاب شما</small>
                                  </div>
                                  <div class="chairBoxx emptyChairr">
                                    <i></i>
                                    <small>قابل انتخاب</small>
                                  </div>
                                </div>
                                <div class="chairBoxColumn">
                                  <div class="chairBoxx boughtMale">
                                    <i></i>
                                    <small>رزرو شده</small>
                                  </div>
                                  <div class="chairBoxx boughtFemale">
                                    <i></i>
                                    <small>غیر قابل انتخاب</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="ChairForm">
                    <div v-for="(c, i) in chairsArray" :key="i">
                      <div class="row" v-if="i === 0">
                        <div class="col-12">
                          <div class="d-flex justify-content-between align-items-center pb-2">
                            <h5 class="fw-bold">
                              <span class="mdi mdi-account-multiple"></span>
                              مشخصات مسافران
                            </h5>
                            <div v-if="!timerExpired">
                                <span class="text-dark ms-4">
                                  <span class="timer">
                                    <span v-if="minutes < 10">0{{ minutes }}</span><span v-else>{{ minutes }}</span>:<span v-if="seconds < 10">0{{ seconds }}</span><span v-else>{{ seconds }}</span>
                                  </span>
                                  <span class="mdi mdi-timer-outline"></span>
                                </span>
                            </div>
                          </div>
                        </div>
                        <hr>
                        <div class="col-12">
                          <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                            <div class="personChairName">
                              <h6 class="fw-bold">
                               <img src="/img/bus/chair2.svg" /> <small class="text-blue">صندلی {{  c.number  }}</small>
                              </h6>
                            </div>
                            <div class="personChairOptions">
                              <div class="addLatestPerson" @click="previousPassengersFuncc(c)">
                                <span class="mdi mdi-account-plus mdi-18px"></span>
                                <span>مسافران قبلی</span>
                              </div>
                              <div class="deleteChairPerson" @click="chooseChair(c)">
                                <span class="mdi mdi-trash-can"></span>
                                <span>حذف</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-2 col-12 pe-1">
                          <v-text-field rounded @update:focused="focusAll($event,c)" :error="c.nameError" :rules="rules" color="var(--blue-700)" density="comfortable" label="نام" variant="solo" v-model="c.name" @update:modelValue="firstPersonChange"></v-text-field>
                        </div>
                        <div class="col-lg-2 col-12 px-1">
                          <v-text-field rounded @update:focused="focusAll($event,c)" :error="c.familyError" :rules="rules" color="var(--blue-700)" density="comfortable" label="نام خانوادگی" variant="solo" v-model="c.family" @update:modelValue="firstPersonChange"></v-text-field>
                        </div>
                        <div class="col-lg-4 col-12 px-1">
                          <v-text-field rounded :error="c.nationalError" @update:focused="checkNationalCode($event,c)" :rules="nationalCodeRules" color="var(--blue-700)" density="comfortable" label="کد ملی (اتباع خارجه)" variant="solo" v-model="c.nationalCode" @update:modelValue="firstPersonChange"></v-text-field>
                        </div>
                        <div class="col-lg-4 col-12 ps-1">
                          <v-text-field rounded :error="c.mobileError" @update:focused="checkMobileNumber($event,c)" :rules="mobileRules" color="var(--blue-700)" density="comfortable" label="شماره موبایل (جهت احراز هویت)" variant="solo" v-model="c.mobile" @update:modelValue="firstPersonChange"></v-text-field>
                        </div>
                        <div class="col-lg-4 col-12 pe-1 position-relative">
                          <v-text-field rounded @update:focused="focusAll($event,c)" :error="c.birthError" :rules="rules" color="var(--blue-700)" density="comfortable" label="تاریخ تولد" variant="solo" v-model="c.birth"></v-text-field>
                          <div class="fullscreenBirth" @click="c.showDate = true"></div>
                          <ClientOnly>
                              <date-picker class="datepickerInput" :max="global.today" simple format="jYYYY/jMM/jDD" display-format="jYYYY/jMM/jDD" v-model="c.birth" :show="c.showDate" @close="c.showDate = false" />
                          </ClientOnly>
                        </div>
                        <div class="col-lg-2 col-12 px-1">
                          <v-select variant="solo" color="var(--blue-700)" density="comfortable" :items="['ملیت ایرانی', 'ملیت غیر ایرانی']" v-model="c.nation"></v-select>
                        </div>
                        <div class="col-lg-2 col-12 ps-1">
                          <v-select @update:focused="focusAll($event,c)" :error="c.genderError" variant="solo" color="var(--blue-700)" density="comfortable" :items="['مرد', 'زن']" v-model="c.gender" @update:modelValue="firstPersonChange"></v-select>
                        </div>
                      </div>
                      <div class="row" v-else>
                        <hr>
                        <div class="col-12">
                          <div class="d-flex flex-row justify-content-between align-items-center mb-3">
                            <div class="personChairName">
                              <h6 class="fw-bold">
                               <img src="/img/bus/chair2.svg" /> <small class="text-blue">صندلی {{  c.number  }}</small>
                              </h6>
                            </div>
                            <div class="personChairOptions">
                              <div class="addLatestPerson" @click="previousPassengersFuncc(c)">
                                <span class="mdi mdi-account-plus mdi-18px"></span>
                                <span>مسافران قبلی</span>
                              </div>
                              <div class="deleteChairPerson" @click="chooseChair(c)">
                                <span class="mdi mdi-trash-can"></span>
                                <span>حذف</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-2 col-12 pe-1">
                          <v-text-field @update:focused="focusAll($event,c)" :error="c.nameError" :rules="rules" color="var(--blue-700)" density="comfortable" label="نام" variant="solo" v-model="c.name"></v-text-field>
                        </div>
                        <div class="col-lg-2 col-12 px-1">
                          <v-text-field @update:focused="focusAll($event,c)" :error="c.familyError" :rules="rules" color="var(--blue-700)" density="comfortable" label="نام خانوادگی" variant="solo" v-model="c.family"></v-text-field>
                        </div>
                        <div class="col-lg-4 col-12 px-1">
                          <v-text-field :error="c.nationalError" @update:focused="checkNationalCode($event,c)" :rules="nationalCodeRules" color="var(--blue-700)" density="comfortable" label="کد ملی (اتباع خارجه)" variant="solo" v-model="c.nationalCode"></v-text-field>
                        </div>
                        <div class="col-lg-4 col-12 pe-1"></div>
                        <div class="col-lg-4 col-12 pe-1 position-relative">
                          <v-text-field @update:focused="focusAll($event,c)" :error="c.birthError" :rules="rules" color="var(--blue-700)" density="comfortable" label="تاریخ تولد" variant="solo" v-model="c.birth"></v-text-field>
                          <div class="fullscreenBirth" @click="c.showDate = true"></div>
                          <ClientOnly>
                              <date-picker :max="global.today" simple format="jYYYY/jMM/jDD" display-format="jYYYY/jMM/jDD" v-model="c.birth" :show="c.showDate" @close="c.showDate = false" />
                          </ClientOnly>
                        </div>
                        <div class="col-lg-2 col-12 px-1">
                          <v-select variant="solo" color="var(--blue-700)" density="comfortable" :items="['ملیت ایرانی', 'ملیت غیر ایرانی']" v-model="c.nation"></v-select>
                        </div>
                        <div class="col-lg-2 col-12 ps-1">
                          <v-select @update:focused="focusAll($event,c)" :error="c.genderError" variant="solo" color="var(--blue-700)" density="comfortable" :items="['مرد', 'زن']" v-model="c.gender"></v-select>
                        </div>
                        <div class="col-lg-6 col-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-12 col-sm-12 col-12">
              <div class="buyTicketChairs flex-column">
                <!-- <div class="headerBuyTicket">
                  <h5 class="fw-bold" v-for="(d,i) in details" :key="i">انتخاب صندلی اتوبوس {{ d.boardingPoint.city }} به {{ d.destCity }}</h5>
                </div> -->
                <div v-if="apiTypee == 2">
                  <div class="seats-container justify-content-start" v-if="chairSeatLoader">
                    <div class="spinner-border mt-5 mx-auto" style="width:5rem;height: 5rem;" role="status">
                          <span class="visually-hidden"></span>
                      </div>
                  </div>
                  <div class="seats-container" v-else>
                    <div class="transport-seats" v-if="chairData !== null">
                      <span class="tayer fronttayerleft"></span>
                      <span class="tayer fronttayerright"></span>
                      <span class="tayer backtayerleft"></span>
                      <span class="tayer backtayerright"></span>
                      <span class="tayer centertayerleft"></span>
                      <span class="tayer centertayerright"></span>
                      <div class="seats-row headOfBus">
                          <div class="frontBusText">
                            <div class="ms-2">جلوی اتوبوس</div>
                            <div class="seat wheel">
                                <span class="wheel-icon">
                                    <NuxtImg loading="lazy" format="webp" src="/img/wheel.svg"  />
                                </span>
                            </div>
                          </div>
                      </div>
                      <div class="seats-row" v-for="(group, row) in chairData" :key="row">
                        <button class="seat" v-for="(itemRow, index) in group[1].slice().reverse()" :key="index"
                          :class="{'seat-male': itemRow.status == 'BookedForMale', 'seat-female': itemRow.status == 'BookedForFemale','seat-noseat' : itemRow.number == 0, 'selected' : itemRow.status == 'selected'}" :disabled="itemRow.status == 'BookedForMale' || itemRow.status == 'BookedForFemale'" @click="chooseChair(itemRow)">
                          <span v-if="itemRow.number !== 0">
                            <span v-if="itemRow.status == 'BookedForMale'">
                              آقا
                            </span>
                            <span v-else-if="itemRow.status == 'BookedForFemale'">
                              خانم
                            </span>
                            <span v-else>
                              {{ itemRow.number }}
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div v-else>
                        <span>صندلی های سرویس مورد نظر دریافت نشد!</span>
                    </div>
                  </div>
                </div>
                <div v-if="apiTypee == 5">
                  <div class="seats-container justify-content-start" v-if="chairSeatLoader">
                      <div class="spinner-border mt-5 mx-auto" style="width:5rem;height: 5rem;" role="status">
                          <span class="visually-hidden"></span>
                      </div>
                  </div>
                  <div class="seats-container" v-else>
                    <div class="transport-seats" v-if="chairData !== null">
                        <span class="tayer fronttayerleft"></span>
                        <span class="tayer fronttayerright"></span>
                        <span class="tayer backtayerleft"></span>
                        <span class="tayer backtayerright"></span>
                        <span class="tayer centertayerleft"></span>
                        <span class="tayer centertayerright"></span>
                        <div class="seats-row headOfBus">
                            <div class="frontBusText">
                              <div class="ms-2">جلوی اتوبوس</div>
                              <div class="seat wheel">
                                  <span class="wheel-icon">
                                      <NuxtImg loading="lazy" format="webp" src="/img/wheel.svg"  />
                                  </span>
                              </div>
                            </div>
                        </div>
                        <div class="seats-row" v-for="(group, row) in chairData" :key="row">
                            <button class="seat" v-for="(itemRow, index) in group[1]" :key="index" :disabled="itemRow.status == 'm' || itemRow.status == 'f'" :class="{'seat-male': itemRow.status == 'm', 'seat-female': itemRow.status == 'f','seat-noseat' : itemRow.number == -1, 'selected' : itemRow.status == 'selected'}" @click="chooseChair(itemRow)">
                                <span v-if="itemRow.number !== -1">
                                  <span v-if="itemRow.status == 'm'">
                                    آقا
                                  </span>
                                  <span v-else-if="itemRow.status == 'f'">
                                    خانم
                                  </span>
                                  <span v-else>
                                    {{ itemRow.number }}
                                  </span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <span>صندلی های سرویس مورد نظر دریافت نشد!</span>
                    </div>
                  </div>
                </div>
                <div v-if="apiTypee == 3 || apiTypee == 1">
                    <div class="seats-container justify-content-start" v-if="chairSeatLoader">
                      <div class="spinner-border mt-5 mx-auto" style="width:5rem;height: 5rem;" role="status">
                            <span class="visually-hidden"></span>
                        </div>
                    </div>
                    <div class="seats-container" v-else>
                      <div class="transport-seats" v-if="chairData !== null">
                          <span class="tayer fronttayerleft"></span>
                          <span class="tayer fronttayerright"></span>
                          <span class="tayer backtayerleft"></span>
                          <span class="tayer backtayerright"></span>
                          <span class="tayer centertayerleft"></span>
                          <span class="tayer centertayerright"></span>
                          <div class="seats-row headOfBus">
                              <div class="frontBusText">
                                <div class="ms-2">جلوی اتوبوس</div>
                                <div class="seat wheel">
                                    <span class="wheel-icon">
                                        <NuxtImg loading="lazy" format="webp" src="/img/wheel.svg"  />
                                    </span>
                                </div>
                              </div>
                          </div>
                          <div class="seats-row" v-for="(group, row) in chairData" :key="row">
                              <button class="seat" v-for="(item, index) in group[1]" :key="index" :class="{'seat-male': item.reserve == '2', 'seat-female': item.reserve == '1','seat-noseat' : item.number == 0, 'selected' : item.reserve == 'selected'}" :disabled="item.reserve == '2' || item.reserve == '1'" @click="chooseChair(item)">
                                      <span v-if="item.number !== 0">
                                        <span v-if="item.reserve == '2'">
                                          آقا
                                        </span>
                                        <span v-else-if="item.reserve == '1'">
                                          خانم
                                        </span>
                                        <span v-else>
                                          {{ item.number }}
                                        </span>
                                      </span>
                              </button>
                          </div>
                      </div>
                      <div v-else>
                          <span>صندلی های سرویس مورد نظر دریافت نشد!</span>
                      </div>
                    </div>
                </div>
                <div class="headerBuyTicket p-3" v-if="chairsArray.length > 0">
                  <div class="buyTicketHelp flex-column align-items-start">
                    <div class="chairBoxColumn w-100 justify-content-between m-0 mb-5">
                      <div class="chairBoxx w-100 yourChoise">
                        <i></i>
                        <small>انتخاب شما</small>
                      </div>
                      <div class="chairBoxx w-100 emptyChairr">
                        <i></i>
                        <small>قابل انتخاب</small>
                      </div>
                    </div>
                    <div class="chairBoxColumn w-100 justify-content-between m-0">
                      <div class="chairBoxx w-100 boughtMale">
                        <i></i>
                        <small>رزرو شده</small>
                      </div>
                      <div class="chairBoxx w-100 boughtFemale">
                        <i></i>
                        <small>غیر قابل انتخاب</small>
                      </div>








                    </div>





                  </div>


             


                </div>

                     
             




              </div>


            



            </div>





          </div>

          <div class="bottomBtnSection mt-4">
          <div class="container">
            <div class="row">
              <div class="col-lg-9">
                <div class="d-flex flex-row justify-content-between align-items-center">
                  <button type="button" class="btnOutlineTicketSection" @click="goBackToPath">
                    بازگشت
                  </button>
                  <button type="button" class="btnTicketSection" @click="confirmAndNext">
                    <div class="arrow"><span></span><span></span><span></span></div>
                    تایید و ادامه
                  </button>
                </div>
              </div>
              <div class="col-lg-3"></div> <!-- فضای خالی سمت راست برای تعادل -->
            </div>
          </div>
        </div>


        </div>









      </div>
      <v-dialog v-model="timeDialog" max-width="300" class="dialogLoadService">
          <v-card max-width="500">
              <template v-slot:actions>
                  <div class="loadServiceTimer">
                    <span class="mdi mdi-alert-circle-outline"></span>
                    <div class="mb-4">زمان شما به اتمام رسید</div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between w-100">
                      <button type="button" class="roundBtn w-100" @click="goToservicePage">
                          انتخاب مجدد سرویس
                      </button>
                  </div>
              </template>
          </v-card>
      </v-dialog>
      <v-dialog v-model="isPreviuosModalOpen" max-width="800" transition="dialog-bottom-transition" :fullscreen="ppmobile">
          <v-card>
              <template v-slot:actions>
                <div class="previousP">
                  <div class="pphead">
                      <div>
                        <span class="mdi mdi-account-group-outline"></span>
                        انتخاب مسافران
                      </div>
                      <span class="mdi mdi-close" @click="closePM"></span>
                  </div>
                  <div class="ppbody">
                    <div v-if="previuosPassengersArray.length > 0">
                      <table class="table">
                        <thead>
                          <tr class="table-secondary">
                            <th scope="col">نام و نام خانوادگی</th>
                            <th scope="col">کدملی/ ش پاسپورت</th>
                            <th scope="col">تاریخ تولد</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(p,i) in previuosPassengersArray" :key="i">
                            <td>{{ p.name }} {{ p.lastName }}</td>
                            <td>{{ p.nationalCode }}</td>
                            <td>{{ p.shamsiDate }}</td>
                            <td>
                              <div class="choosePP" @click="sendPP(p)">
                                انتخاب
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="text-center" v-else>
                      <table class="table">
                        <thead>
                          <tr class="table-secondary">
                            <th scope="col">نام و نام خانوادگی</th>
                            <th scope="col">کدملی/ ش پاسپورت</th>
                            <th scope="col">تاریخ تولد</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </table>
                      <span class="text-dark"> موردی یافت نشد. </span>
                    </div>
                  </div>
                </div>


              </template>
          </v-card>
          <یهر
      </v-dialog>
      


  


      
    </div>




    <LazyTelSupport />
  </template>
  
  <script setup>
    definePageMeta({
        ssr : false,
    });
    import { useRoute } from "vue-router";
    import { useSearchbox } from '@/store/globalSearchbox.js';
    import { useToast } from "vue-toastification";
    import jalaliMoment from 'jalali-moment';
    import moment from "jalali-moment";
    const Toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const global = useSearchbox();
    const { getUser } = useSearchbox();
    //const chairData = computed(() => global.serviceChairPayload);
    const chairData = computed(() => mockChairData.value);
    const mockChairData = ref(null);
    const frontChairSeat = computed(() => global.frontBusSeat);
    //const apiTypee = computed(() => global.apiTypee);
    const apiTypee = ref(2); // یا computed(() => 2)
    //const chairSeatLoader = computed(() => global.chairSeatLoader);
    const chairSeatLoader = ref(true);
    const details = computed(() => global.bussEntity);
    const timerExpired = ref(false);
    const minutes = ref(20);
    const seconds = ref(0);
    const interval = ref(null);
    const timeDialog = ref(false);
    const chairsArray = ref([]);
    const ppmobile = ref(false);
    const { authUser } = useAuth();
    const isPreviuosModalOpen = computed(() => global.isPreviuosModalOpen);
    const selectedChairForPreviuosP = ref(null);
    const previuosPassengersArray = computed(() => global.previuosPassengersArray);
    const ticketPrice = computed(() => global.ticketPrice);
    const userInfo = computed(() => global.userInfo);
    const firstPerson = reactive({
      name : "",
      family : "",
      nationalCode : "",
      mobile : "",
      birth : "",
      gender : "مرد",
      nation : "ملیت ایرانی"
    });
    const rules = ref([
      value => !!value || 'مقدار این فیلد نباید خالی باشد.',
    ]);
    const nationalCodeRules = ref([
      value => !!value || 'مقدار کد ملی نباید خالی باشد.',
      value => {
        if (value.length == 10) {
          return isValidNationalCode(value) || 'کد ملی معتبر نمی باشد';
        } else {
          return true;
        }
      }
    ]);
    const mobileRules = ref([
      value => !!value || 'شماره موبایل نباید خالی باشد.',
      value => {
        if (value.length >= 11) {
          return isValidMobileNumber(value) || 'شماره موبایل معتبر نمی باشد';
        }
      }
    ]);
    const persianDate = ref("");
    const persianweek = ref("");
  
    onMounted(async () => {
      setTimeout(() => {
        userInfo.value.forEach((user) => {
          firstPerson.name = user.name;
          firstPerson.family = user.surename;
          firstPerson.mobile = user.mobile;
        });
        console.log(details.value)
        console.log(details.value.length)
        if(details.value && details.value.length > 0) {
          persianDate.value = moment(details.value.departureDate)
          .locale('fa')
          .format('D MMMM YYYY');
          persianweek.value =  moment(details.value.departureDate)
          .locale('fa')
          .format('dddd');
        }
      },1000);
      startTimer();
      if(window.innerWidth < 991){
        ppmobile.value = true;
      }
      if(authUser.value) {
        await getUser(authUser.value);
      }











      // === شروع هاردکد نقشه صندلی ===
  chairSeatLoader.value = true; // لودر رو نشون بده

// شبیه‌سازی تاخیر API (۱ ثانیه)
setTimeout(() => {
  // داده نمونه برای اتوبوس VIP ۲۵ نفره (شماره صندلی‌ها نمایش داده می‌شه)
  mockChairData.value = [
    [0, [
      { number: 1,  status: "Available" },
      { number: 2,  status: "BookedForMale" },    // رزرو شده آقا
      { number: 0,  status: "Available" },       // راهرو
      { number: 3,  status: "Available" },
      { number: 4,  status: "BookedForFemale" }   // رزرو شده خانم
    ]],
    [1, [
      { number: 5,  status: "Available" },
      { number: 6,  status: "Available" },
      { number: 0,  status: "Available" },
      { number: 7,  status: "Available" },
      { number: 8,  status: "Available" }
    ]],
    [2, [
      { number: 9,  status: "Available" },
      { number: 10, status: "Available" },
      { number: 0,  status: "Available" },
      { number: 11, status: "Available" },
      { number: 12, status: "Available" }
    ]],
    [3, [
      { number: 13, status: "Available" },
      { number: 14, status: "Available" },
      { number: 0,  status: "Available" },
      { number: 15, status: "Available" },
      { number: 16, status: "Available" }
    ]],
    [4, [
      { number: 17, status: "Available" },
      { number: 18, status: "Available" },
      { number: 0,  status: "Available" },
      { number: 19, status: "Available" },
      { number: 20, status: "Available" }
    ]],
    [5, [ // ردیف آخر (۵ صندلی)
      { number: 21, status: "Available" },
      { number: 22, status: "Available" },
      { number: 23, status: "Available" },
      { number: 24, status: "Available" },
      { number: 25, status: "Available" }
    ]]
  ];

  // حالا لودر رو مخفی کن
  chairSeatLoader.value = false;
}, 1000); // ۱ ثانیه صبر کن تا لودر دیده بشه
// === پایان هاردکد ===













    });
  
    function isEmpty(obj) {
      return Object.keys(obj).length === 0;
    }
    if (!isEmpty(route.query)) {
      let obj = route.query;
      global.getServiceDetail(obj.busId, obj.tokenCompany, obj.serviceId, obj.tripId, obj.sellerId, obj.sellerTicketId,
        obj.src, obj.dest, 0, obj.type);
    } else {
      navigateTo("/");
    }
  
    function chooseChair(chair){
        if(apiTypee.value == 2){
          if(chair.status == "selected"){
            chair.status = "Available";
            if(chairsArray.value.length > 1){
              chair.gender = "مرد";
              chair.name = "";
              chair.family = "";
              chair.nationalCode = "";
              chair.birth = "";
              chair.nation = 'ملیت ایرانی';
            }
            chairsArray.value = chairsArray.value.filter(c => c !== chair);
          } else {
            if(chairsArray.value.length == 4){// تعداد مجاز انتخاب صندلی
              Toast.error("تعداد صندلی های انتخاب شده نباید بیشتر از 4 باشد");
            } else {
              chair.status = "selected";
              chairsArray.value.push(chair);
            }
          }
        } else if(apiTypee.value == 5) {
          if(chair.status == "selected"){
            chair.status = "e";
            if(chairsArray.value.length > 1){
              chair.gender = "مرد";
              chair.name = "";
              chair.family = "";
              chair.nationalCode = "";
              chair.birth = "";
              chair.nation = 'ملیت ایرانی';
            }
            chairsArray.value = chairsArray.value.filter(c => c !== chair);
          } else {
            if(chairsArray.value.length == 10) { // تعداد مجاز انتخاب صندلی
              Toast.error("تعداد صندلی های انتخاب شده نباید بیشتر از 10 باشد");
            } else {
              chair.status = "selected";
              chairsArray.value.push(chair);
            }
          }
        } else if(apiTypee.value == 3 || apiTypee.value == 1) {
          if(chair.reserve == "selected"){
            chair.reserve = "0";
            if(chairsArray.value.length > 1){
              chair.gender = "مرد";
              chair.name = "";
              chair.family = "";
              chair.nationalCode = "";
              chair.birth = "";
              chair.nation = 'ملیت ایرانی';
            }
            chairsArray.value = chairsArray.value.filter(c => c !== chair);
            console.log(chairsArray.value)
          } else {
            if(chairsArray.value.length == 10) { // تعداد مجاز انتخاب صندلی
              Toast.error("تعداد صندلی های انتخاب شده نباید بیشتر از 10 باشد");
            } else {
              chair.reserve = "selected";
              chairsArray.value.push(chair);
            }
          }
        }
        if(chairsArray.value.length > 0){
          chairsArray.value.forEach((item,index) => {
            if(index == 0){
              if(!item.mobile){
                item.mobile = firstPerson.mobile;
              }
              if(!item.gender){
                item.gender = firstPerson.gender;
              }
              if(!item.name){
                item.name = firstPerson.name;
              }
              if(!item.family){
                item.family = firstPerson.family;
              }
              if(!item.nationalCode){
                item.nationalCode = firstPerson.nationalCode;
              } 
              if(!item.birth){
                item.birth = firstPerson.birth;
              }
              if(!item.nation){
                item.nation = firstPerson.nation;
              }
            } else {
              item.name = "";
              item.family = "";
              item.nationalCode = "";
              item.mobile = "";
              item.birth = "";
              item.gender = "مرد";
              item.nation = "ملیت ایرانی";
            }
          });
        }
        console.log(chairsArray.value)
    }
    const startTimer = () => {
        interval.value = setInterval(() => {
            if (seconds.value > 0) {
                seconds.value--;
            } else {
                if (minutes.value === 0) {
                    timerExpired.value = true;
                    clearInterval(interval.value);
                    timeDialog.value = true;
                    setTimeout(() => {
                      router.go(-1);
                    },3000);
                } else {
                    minutes.value--;
                    seconds.value = 59;
                }
            }
        }, 1000);
    };
    const goToservicePage = () => {
      router.go(-1);
    };
    const firstPersonChange = () => {
      if(chairsArray.value.length > 0){
        chairsArray.value.forEach((item,key) => {
          if(key == 0){
            firstPerson.mobile = item.mobile;
            firstPerson.gender = item.gender;
            firstPerson.name = item.name;
            firstPerson.family = item.family;
            firstPerson.nationalCode = item.nationalCode;
            firstPerson.birth = item.birth;
            firstPerson.nation = item.nation;
          }
        });
      }
    }
    //-----checkNationalcode--------------
    function isValidNationalCode(nc) {
        if (!nc || nc.length != 10)
            return false;
        if (nc == '1111111111' || nc == '0000000000' ||
            nc == '2222222222' || nc == '3333333333' ||
            nc == '4444444444' || nc == '5555555555' ||
            nc == '6666666666' || nc == '7777777777' ||
            nc == '8888888888' || nc == '9999999999')
            return false;
        var c = parseInt(nc.charAt(9));
        var n = parseInt(nc.charAt(0)) * 10
            + parseInt(nc.charAt(1)) * 9
            + parseInt(nc.charAt(2)) * 8
            + parseInt(nc.charAt(3)) * 7
            + parseInt(nc.charAt(4)) * 6
            + parseInt(nc.charAt(5)) * 5
            + parseInt(nc.charAt(6)) * 4
            + parseInt(nc.charAt(7)) * 3
            + parseInt(nc.charAt(8)) * 2;
        var r1 = parseInt(n % 11);
        if (r1 < 2) {
            if (c == r1)
                return true;
        }
        else if ((11 - r1) == c)
            return true;
        return false;
    }
    function checkNationalCode(event,el){
      if(!event){
        nationalCodeRules.value = [
          value => !!value || 'مقدار کد ملی نباید خالی باشد.',
          value => {
            if (value.length == 10) {
              return isValidNationalCode(value) || 'کد ملی معتبر نمی باشد';
            } if (value.length < 10) {
              return 'کد ملی معتبر نمی باشد';
            } else {
              return true;
            }
          }
        ];
      } else {
        if(el.nationalError !== undefined){
          el.nationalError = false;
        }
        nationalCodeRules.value = [
          value => !!value || 'مقدار کد ملی نباید خالی باشد.',
          value => {
            if (value.length == 10) {
              return isValidNationalCode(value) || 'کد ملی معتبر نمی باشد';
            } else {
              return true;
            }
          }
        ];
      }
    }
    function isValidMobileNumber(value) {
      // بررسی اینکه آیا شماره موبایل 11 رقمی است و با "09" شروع می‌شود
      const mobileRegex = /^09\d{9}$/;
      return mobileRegex.test(value);
    }
    function checkMobileNumber(event,el){
      if(!event){
        mobileRules.value = [
          value => !!value || 'شماره موبایل نباید خالی باشد.',
          value => {
            if (value.length >= 11) {
              return isValidMobileNumber(value) || 'شماره موبایل معتبر نمی باشد';
            } else if (value.length < 11) {
              return 'شماره موبایل معتبر نمی باشد';
            }
          }
        ];
      } else {
        if(el !== undefined && el.mobileError !== undefined){
          el.mobileError = false;
        }
        mobileRules.value = [
          value => !!value || 'شماره موبایل نباید خالی باشد.',
          value => {
            if (value.length >= 11) {
              return isValidMobileNumber(value) || 'شماره موبایل معتبر نمی باشد';
            }
          }
        ];
      }
    }
    function focusAll(event,el){
      if(event) {
        if(el.nameError){
          if(el.nameError == true){
            el.nameError = false;
          }
        }
        if(el.familyError){
          if(el.familyError == true){
            el.familyError = false;
          }
        }
        if(el.birthError){
          if(el.birthError == true){
            el.birthError = false;
          }
        }
        if(el.genderError){
          if(el.genderError == true){
            el.genderError = false;
          }
        }
        if(el.nationalError){
          if(el.nationalError == true){
            el.nationalError = false;
          }
        }
        if(el.mobileError){
          if(el.mobileError == true){
            el.mobileError = false;
          }
        }
      }
    }
    function closePM(){
      global.setPMModal(false);
    }
    function previousPassengersFuncc(el){
      selectedChairForPreviuosP.value = el;
      if(authUser.value == null){
        global.setLoginModalOpen(true);
      } else {
        global.setPMModal(true);
        global.getPreviuosPassengers(authUser.value);
      }
    }
    function sendPP(el){
      userInfo.value.forEach((user) => {
        firstPerson.name = user.name;
        firstPerson.family = user.surename;
        firstPerson.mobile = user.mobile;
      });
      if(chairsArray.value.length == 0){
        firstPerson.birth = el.shamsiDate;
        firstPerson.name = el.name;
        firstPerson.family = el.lastName;
        firstPerson.nationalCode = el.nationalCode;
        if(el.gender == 0) {
          firstPerson.gender = "مرد";
        } else {
          firstPerson.gender = "زن";
        }
        firstPerson.nation = el.nation;
      } else {
        chairsArray.value.forEach((item) => {
          if(item.number == selectedChairForPreviuosP.value.number){
            item.birth = el.shamsiDate;
            item.name = el.name;
            item.family = el.lastName;
            item.nationalCode = el.nationalCode;
            if(el.gender == 0) {
              item.gender = "مرد";
            } else {
              item.gender = "زن";
            }
            item.nation = el.nation;
          }
        });
      }
      closePM();
    }
    const confirmAndNext = async () => {
      let isReturn = false;
      if(chairsArray.value.length == 0) {
        Toast.error("لطفا حداقل یک صندلی را انتخاب نمایید");
        isReturn = true;
        return;
      } else {
        chairsArray.value.forEach((item,index) => {
          if(item.name == undefined && item.family == undefined && item.nationalCode == undefined && item.birth == undefined && item.gender == undefined && item.mobile == undefined) {
            item.nameError = true;
            item.familyError = true;
            item.nationalError = true;
            item.birthError = true;
            item.genderError = true;
            if(index == 0) {
              item.mobileError = true;
            }
            isReturn = true;
          } else {
            if(!item.name){
              item.nameError = true;
              isReturn = true;
            } 
            if(!item.family){
              item.familyError = true;
              isReturn = true;
            } 
            if(!item.nationalCode){
              item.nationalError = true;
              isReturn = true;
            } 
            if(!item.birth){
              item.birthError = true;
              isReturn = true;
            } 
            if(!item.gender){
              item.genderError = true;
              isReturn = true;
            } 
            if(!item.mobile){
              if(index == 0){
                item.mobileError = true;
                isReturn = true;
              }
            }
          }
        });
      }
      console.log(chairsArray.value)
      console.log(route.query)
      if(isReturn){
        Toast.error("این فیلد (ها) نباید خالی باشند");
        return;
      } else {
        let selectChaires = "";
        let listPerson = [];
        let use724 =  false;
        let mobileNumber = "";
        chairsArray.value.forEach((item,index) => {
          jalaliMoment.locale('en');
          let datee = jalaliMoment.from(item.birth, 'fa', 'jYYYY/jMM/jDD').format('DD/MM/YYYY');
          console.log(datee)
          if(item.gender == "مرد"){
            selectChaires += `m${item.number};`;
          } else {
            selectChaires += `f${item.number};`;
          }
          if(index == 0){
            mobileNumber = item.mobile;
            listPerson.push({
              name : item.name,
              lastName : item.family,
              nationalCode : item.nationalCode,
              brithDay : datee,
              foreign : "1",
              genders : "string",
              address : "string",
              isParent : true
            });
          } else {
            listPerson.push({
              name : item.name,
              lastName : item.family,
              nationalCode : item.nationalCode,
              brithDay : datee,
              foreign : "1",
              genders : "string",
              address : "string",
              isParent : false
            });
          }
        });
        if(apiTypee.value == 2){
          use724 = true;
        }
        if(route.query.serviceId == undefined){
          route.query.serviceId = "";
        }
        if(route.query.tokenCompany == undefined){
          route.query.tokenCompany = "";
        }
        if(route.query.tripId == undefined){
          route.query.tripId = "string";
        }
        if(route.query.busId == undefined){
          route.query.busId = "";
        }
  
        await reserveTicket(selectChaires,route.query.busId,route.query.serviceId,route.query.tokenCompany,route.query.sellerId,route.query.tripId,route.query.sellerTicketId,0,route.query.src,route.query.dest,use724,mobileNumber,listPerson);
        //"Error Is : There are multiple root elements. Line 1, position 18.- StackTrace :   at System.Xml.XmlTextReaderImpl.Throw(Exception e)
        //  at System.Xml.XmlTextReaderImpl.Throw(String res, String arg)
        //  at System.Xml.XmlTextReaderImpl.ParseDocumentContent()
        //  at System.Xml.XmlLoader.LoadDocSequence(XmlDocument parentDoc)
        //  at System.Xml.XmlDocument.Load(XmlReader reader)
        //  at System.Xml.XmlDocument.LoadXml(String xml)
        //  at PayaSafar.Business.Service.BuyTicketService.SaleTicketsNew(SaleTicketDto SelleTicketDtoModel) in D:\old_E\BehzadFile\hezhaHesab\payasafarApi_git\PayaSafar.Business\Service\BuyTicketService.cs:line 1101"
      }
    }
    function goBackToPath(){
      router.go(-1);
    }


    
    async function reserveTicket(selectChaires,busId,serviceId,tokenCompany,sellerId,tripId,sellerTicketId,userId,srcCode,destCode,use724,mobileNumber,listPerson) {
          const requestedBody = {
            selectChaires : selectChaires,
            busId : busId,
            serviceId : serviceId,
            tokenCompany : tokenCompany,
            sellerId : sellerId,
            tripId : tripId,
            sellerTicketId : sellerTicketId,
            userId : userId,
            srcCode : srcCode,
            destCode : destCode,
            useCreditOnSafar724 : use724,
            mobileNumber : mobileNumber,
            listPerson : listPerson
          }
          console.log(requestedBody)
          try {
              const response = await $fetch('/api/buyTicket/reserveTicket', {
                  method: 'POST',
                  body: requestedBody
              });
              console.log(response); 
              //this.isDobllecheck = true;
              console.log('--------------'); 
              console.log(response.code); 
              console.log(response.payload); 
              console.log('--------------'); 
              if(response.code == "0" && response.payload){
                console.log('true'); 
                global.setReserveObj(response.payload)
                navigateTo("/reserve/prepay");
              } else {
                Toast.error(response.message);
              }
          } catch (error) {
              console.log(error)
          } finally {
            
          }
      }








  </script>